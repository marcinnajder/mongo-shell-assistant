import { Schema, ServerSchema, DatabaseSchema, CollectionSchema } from "./schemaProvider";
import { Config, CollectionConfig } from "./configuration";
import { Property, TypePropertyType } from "./objectSchemaExtractor";
import { Enumerable } from "powerseq";

export function generateDts(schema: Schema) {
    let index = 0;
    let src = "";
    let info: Info = {};

    for (let [serverName, serverSchema] of Enumerable.entries<ServerSchema>(schema)) {
        info.serverName = serverName;
        info.serverInterfaceName = formatServerInterfaceName(serverName, index);
        src += generateServer(info);

        for (let [databaseName, databaseSchema] of Enumerable.entries<DatabaseSchema>(serverSchema)) {
            const isDatabaseRef = Array.isArray(databaseSchema);

            if (isDatabaseRef) {
                const newinfo = getRefDatabaseInfo(schema, serverName, databaseName, databaseSchema[0], databaseSchema[1]);
                if (newinfo === null) {
                    continue; // referenced database not found, skip this database
                }
                info = newinfo;

            } else {
                info.databaseName = databaseName;
                info.databaseInterfaceName = formatDatabaseInterfaceName(info);
            }

            src += generateDatabase(info);

            if (!isDatabaseRef) {
                for (let [collectionName, collectionSchema] of Enumerable.entries<CollectionSchema>(databaseSchema)) {
                    info.collectionName = collectionName;
                    info.collectionInterfaceName = formatCollectionInterfaceName(info);
                    src += generateCollection(info, collectionSchema);
                }
            }
        }

        index++;
    }

    return src;
}

function getRefDatabaseInfo(schema: Schema, serverName: string, databaseName: string, refServerName: string, refDatabaseName: string): Info | null {
    const refServerSchema = schema[refServerName || null] || {};
    const refDatabaseSchema = refServerSchema[refDatabaseName || null];

    if (!refDatabaseSchema) {
        return null;
    }

    if (Array.isArray(refDatabaseSchema)) { // reference to other database
        return getRefDatabaseInfo(schema, serverName, databaseName, refDatabaseSchema[0], refDatabaseSchema[1]);
    }

    const info: Info = {
        serverName: serverName,
        serverInterfaceName: formatServerInterfaceName(serverName, Object.keys(schema).indexOf(refServerName)),
        databaseName: refDatabaseName
    };
    info.databaseInterfaceName = formatDatabaseInterfaceName(info);
    info.databaseName = databaseName;
    return info;
}


function generateServer({serverName, serverInterfaceName}: Info) {
    let src = `// ${serverName} 
declare interface Mongo {
    new (host: "${serverName}"): ${serverInterfaceName};
}
declare interface ${serverInterfaceName} extends Mongo {
}
`;
    return src;
}

function formatServerInterfaceName(serverName: string, index: number) {
    return `_${index}_`;
}
function formatDatabaseInterfaceName({serverInterfaceName, databaseName}: Info) {
    return `${serverInterfaceName}${databaseName}_`;
}
function formatCollectionInterfaceName({databaseInterfaceName, collectionName}: Info) {
    return `${databaseInterfaceName}${collectionName}_`;
}


function generateDatabase({serverInterfaceName, serverName, databaseInterfaceName, databaseName}: Info) {
    let baseDatabaseName = `${serverInterfaceName}_BaseDb`;
    let src = `// ${serverName} -> ${databaseName}
declare interface ${baseDatabaseName} extends Db {
    getSiblingDB(database: "${databaseName}"): ${databaseInterfaceName};
}
declare interface ${serverInterfaceName} {
    getDB(database: "${databaseName}"): ${databaseInterfaceName};
}
declare interface ${databaseInterfaceName} extends ${baseDatabaseName} {
}
`;

    return src;
}


function generateCollection({serverName, databaseInterfaceName, databaseName, collectionInterfaceName, collectionName}: Info,
    collectionSchema: CollectionSchema) {
    let flattenName = s => `${s}Flatten`;
    let flattenCollectionName = flattenName(collectionInterfaceName);
    let src = `// ${serverName} -> ${databaseName} -> ${collectionName}
declare interface ${databaseInterfaceName}  {
    ${collectionName}: Collection_<${collectionInterfaceName}, ${flattenCollectionName}>;
    getCollection(name: "${collectionName}"): Collection_<${collectionInterfaceName}, ${flattenCollectionName}>;
}
`;

    if (collectionSchema === null || Array.isArray(collectionSchema)) {
        src += `declare interface ${collectionInterfaceName} {
${generateCollectionContent(<any>collectionSchema)}
}
declare interface ${flattenCollectionName} {
${generateCollectionContent(flattenCollection(<any>collectionSchema))}
}
`;
    }
    else { // handle discrinated collections
        const entityNames: string[] = [];
        for (let [discrimantorValue, collectionSchema2] of Enumerable.entries<Property[] | null>(collectionSchema)) {
            const entityName = collectionInterfaceName + fixIdentifierName(discrimantorValue) + "_";
            entityNames.push(entityName);

            src += `declare interface ${entityName} {
${generateCollectionContent(<any>collectionSchema2)}
}
declare interface ${flattenName(entityName)} {
${generateCollectionContent(flattenCollection(<any>collectionSchema2))}
}
`;
        }

        const discrimantorValues = Object.keys(collectionSchema);
        src += `declare type ${collectionInterfaceName} = ${entityNames.length === 0 ? "any" : entityNames.join("|")} ;
declare type ${flattenCollectionName} = ${entityNames.length === 0 ? "any" : entityNames.map(flattenName).join("|")} ;
`;
    }

    return src;
}

function fixIdentifierName(name: string) {
    return name.replace(/(-|\.)/g, "_");
}


function generateCollectionContent(schema: Property[] | null) {
    if (!schema) return "";

    let src = "";
    for (let property of schema) {
        src += `    ${property.propertyName.indexOf(".") !== -1 ? "\"" + property.propertyName + "\"" : property.propertyName} : ${generatePropertyType(property)}`;
    }
    return src;
}



function generatePropertyType(property: Property) {
    let src = "";
    let propertiesOfType: TypePropertyType[] = <any>property.types.filter(p => p.typeKind === "type");
    let propertiesOfNonType = property.types.filter(p => p.typeKind !== "type");

    if (propertiesOfNonType.length > 0) {
        let propertiesOfNonType_typesstr = propertiesOfNonType
            .map(t => {
                let tt = t.typeKind === "name" ? t.typeName : (t.typeKind === "value" ? (t.typeValue).join("|") : "");
                return `${tt}${t.isArray ? "[]" : ""}`;
            })
            .join("|");

        src += `${propertiesOfNonType_typesstr}
`;

    }

    for (let t of propertiesOfType) {
        src += `${propertiesOfNonType.length > 0 ? "|" : ""}
{
${generateCollectionContent(t.typeType.properties)}
}${t.isArray ? "[]" : ""}
`;
    }

    // src += ";"
    return src || `any
`;
}

// UT
export function flattenCollection(schema: Property[] | null) {
    if (schema === null) return null;

    return Array.from(flatten(schema, null));

    function* flatten(properties: Property[], prefix: string): Iterable<Property> {
        for (let p of properties) {
            const propertyName = prefix === null ? p.propertyName : prefix + "." + p.propertyName;
            yield {
                propertyName: propertyName,
                types: p.types.filter(pp => pp.typeKind !== "type")
            };

            let firstType: TypePropertyType = <any>Enumerable.from(p.types).find(pp => pp.typeKind === "type");
            if (firstType) {
                yield* flatten(firstType.typeType.properties, propertyName);
            }
        }
    }
}

interface Info {
    serverInterfaceName?: string;
    serverName?: string;
    databaseInterfaceName?: string;
    databaseName?: string;
    collectionInterfaceName?: string;
    collectionName?: string;
}