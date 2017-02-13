import { Enumerable, find } from "powerseq";
import { Config, ServerConfig, DatabaseConfig, CollectionConfig } from "./configuration";
import { TOrDiscriminatedT, Doc, ServerDoc, DatabaseDoc, CollectionDoc } from "./sampleDocumentsProvider";
import { Property, extractSchema, TypePropertyType } from "./schemaExtractor";


export type Schema = {
    [serverName: string]: ServerSchema;
};
export type ServerSchema = {
    [databasenName: string]: DatabaseSchema | [string, string];
};
export type DatabaseSchema = {
    [collectionName: string]: CollectionSchema;
};
//export type CollectionSchema = Property[] | null | { [discriminator: string]: Property[] | null };
export type CollectionSchema = TOrDiscriminatedT<Property[] | null>;

export function getSchema(config: Config, doc: Doc) {
    var schema: Schema = {};

    for (let [serverName, serverConfig] of Enumerable.entries<ServerConfig>(config)) {
        const serverDoc: ServerDoc = doc[serverName];
        const serverSchema: ServerSchema = {};

        for (let [databaseName, databaseConfig] of Enumerable.entries<DatabaseConfig>(serverConfig)) {
            if (Array.isArray(databaseConfig)) { // reference to other database
                serverSchema[databaseName] = <any>databaseConfig;
                continue;
            }

            const databaseDoc: DatabaseDoc = serverDoc[databaseName];
            const databaseSchema: DatabaseSchema = {};

            for (let [collectionName, collectionDoc] of Enumerable.entries<CollectionDoc>(databaseDoc)) {
                if (collectionDoc == null) {
                    databaseSchema[collectionName] = null;
                    continue;
                }

                const collectionConfig: CollectionConfig = databaseConfig[collectionName];
                if (!collectionConfig) { // no collection specific configuration
                    databaseSchema[collectionName] = extractSchema(collectionDoc);
                } else {
                    if (collectionConfig.discriminator) {
                        databaseSchema[collectionName] = Enumerable.entries<any>(collectionDoc).toobject(
                            ([discriminatorValue, collectionDoc]) => discriminatorValue,
                            ([discriminatorValue, collectionDoc]) => setDiscriminatorValueAsType(extractSchema(collectionDoc), collectionConfig.discriminator, discriminatorValue));
                    } else {
                        databaseSchema[collectionName] = extractSchema(collectionDoc); //todo: pass options
                    }
                }
            }
            serverSchema[databaseName] = databaseSchema;
        }
        schema[serverName] = serverSchema;
    }

    return schema;
}

//UT
export function setDiscriminatorValueAsType(schema: Property[], discriminator: string, discriminatorValue): Property[] {
    var discriminatorParts = discriminator.split(".");
    replace(schema, 0);
    return schema;

    function replace(properties: Property[], partIndex: number) {
        if (partIndex == discriminatorParts.length - 1) {   //  level containing discriminator property
            const lastPropertyName = discriminatorParts[discriminatorParts.length - 1];
            const discriminatorProperty = find(properties, pp => pp.propertyName === lastPropertyName);
            if (discriminatorProperty) {
                discriminatorProperty.types = [{
                    typeKind: "value",
                    typeValue: [typeof discriminatorValue === "string" ? '"' + discriminatorValue + '"' : discriminatorValue.toString()]
                }];
            }
        } else {
            const currentPropertyPart = discriminatorParts[partIndex];
            const matchingPropery = find(properties, pp => pp.propertyName === currentPropertyPart);
            if (matchingPropery && matchingPropery.types.length > 0) {
                const matchingPropertyType: TypePropertyType = <any>find(matchingPropery.types, t => t.typeKind === "type");
                if (matchingPropertyType) {
                    replace(matchingPropertyType.typeType.properties, ++partIndex);
                }
            }
        }
    }
}




var aaa = {
    "localhost:27017": {
        "test": {
            "users": [
                {
                    "propertyName": "_id",
                    "types": [
                        {
                            "typeKind": "name",
                            "typeName": "ObjectID"
                        }
                    ]
                },
                {
                    "propertyName": "name",
                    "types": [
                        {
                            "typeKind": "name",
                            "typeName": "string"
                        }
                    ]
                }
            ]
            ,
            "contentItems": {
                "page": [

                ]
                ,
                "article": [

                ]
            }
        }
    }

}