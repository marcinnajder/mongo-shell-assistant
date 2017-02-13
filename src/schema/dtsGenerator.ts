import { Schema, ServerSchema, DatabaseSchema, CollectionSchema } from './schemaProvider';
import { Config, CollectionConfig } from './configuration';
import { Property, TypePropertyType } from './schemaExtractor';
import { Enumerable } from 'powerseq';

export function generateDts(schema: Schema) {
    var index = 0;
    var src = "";
    var info: Info = {};

    for (let [serverName, serverSchema] of Enumerable.entries<ServerSchema>(schema)) {
        info.serverName = serverName;
        info.serverInterfaceName = formatServerInterfaceName(serverName, index);
        src += generateServer(info);

        for (let [databaseName, databaseSchema] of Enumerable.entries<DatabaseSchema>(serverSchema)) {
            info.databaseName = databaseName;
            info.databaseInterfaceName = formatDatabaseInterfaceName(info);

            src += generateDatabase(info);

            if (Array.isArray(databaseSchema)) {
                //todo: handle database reference
                continue;
            }

            for (let [collectionName, collectionSchema] of Enumerable.entries<CollectionSchema>(databaseSchema)) {
                info.collectionName = collectionName;
                info.collectionInterfaceName = formatCollectionInterfaceName(info);
                src += generateCollection(info, collectionSchema);
            }
        }

        index++;
    }


    return src;
}



function generateServer({serverName, serverInterfaceName}: Info) {
    var src = `// ${serverName} 
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
    var baseDatabaseName = `${serverInterfaceName}_BaseDb`;
    var src = `// ${serverName} -> ${databaseName}
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
    var flattenName = s => `${s}Flatten`;
    var flattenCollectionName = flattenName(collectionInterfaceName);
    var src = `// ${serverName} -> ${databaseName} -> ${collectionName}
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
        for (var [discrimantorValue, collectionSchema2] of Enumerable.entries<Property[] | null>(collectionSchema)) {
            const entityName = collectionInterfaceName + discrimantorValue + "_";
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


function generateCollectionContent(schema: Property[] | null) {
    if (!schema) return "";

    var src = "";
    for (var property of schema) {
        src += `    ${property.propertyName.indexOf(".") !== -1 ? '"' + property.propertyName + '"' : property.propertyName} : ${generatePropertyType(property)}`;
    }
    return src;
}



function generatePropertyType(property: Property) {
    var src = "";
    var propertiesOfType: TypePropertyType[] = <any>property.types.filter(p => p.typeKind === "type");
    var propertiesOfNonType = property.types.filter(p => p.typeKind !== "type");

    if (propertiesOfNonType.length > 0) {
        var propertiesOfNonType_typesstr = propertiesOfNonType
            .map(t => {
                var tt = t.typeKind === "name" ? t.typeName : (t.typeKind === "value" ? (t.typeValue).join("|") : "");
                return `${tt}${t.isArray ? "[]" : ""}`;
            })
            .join("|");

        src += `${propertiesOfNonType_typesstr}
`;

    }

    for (var t of propertiesOfType) {
        src += `${propertiesOfNonType.length > 0 ? "|" : ""}
{
${generateCollectionContent(t.typeType.properties)}
}${t.isArray ? "[]" : ""}
`;
    }

    //src += ";"
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

            var firstType: TypePropertyType = <any>Enumerable.from(p.types).find(pp => pp.typeKind === "type");
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



