import * as mongodb from "mongodb";
import { Enumerable } from "powerseq";
import { MongoClient, Collection } from "mongodb";
import { log } from "./logger";

import { Config, DatabaseConfig, ServerConfig, CollectionConfig } from './configuration';
//new MongoClient().connect()


export interface Options {
    depth?: number;
    skipPaths?: string[];
}

export type ConfigDoc = { [serverName: string]: ServerDoc };
export type ServerDoc = { [databasenName: string]: DatabaseDoc };
export type DatabaseDoc = { [collectionName: string]: CollectionDoc };
export type CollectionDoc = any | null | { [discriminator: string]: any | null };



// var aaa = {
//     "localhost:27017": {
//         "test": {
//             "users": {
//                 "page": {

//                 }

//             }
//         }
//     }

// }

// export const defaultConfig: Config = {
//     "localhost:27017": {
//         "sampleDatabase": {
//             "__excludes": ["excludedCollection1", "excludedCollection2"],
//             "someCollection": {
//             }
//         },
//         "sampleDatabase2": ["localhost:27017", "sampleDatabase"]
//     }
// };


export async function getDocForConfig(config: Config): Promise<ConfigDoc> {
    var result = {};
    for (let [serverName, serverConfig] of Enumerable.entries<ServerConfig>(config)) {
        let doc = await getDocForServer(serverName, serverConfig);
        result[serverName] = doc;
    }
    return result;
}

async function getDocForServer(serverName: string, serverConfig: ServerConfig): Promise<ServerDoc> {
    var result = {};
    for (let [databaseName, databaseConfig] of Enumerable.entries<DatabaseConfig>(serverConfig)) {
        if (!Array.isArray(databaseConfig)) {
            let doc = await getDocForDatabase(serverName, databaseName, databaseConfig);
            result[databaseName] = doc;
        }
    }
    return result;
}

async function getDocForDatabase(serverName: string, databaseName: string, databaseConfig: DatabaseConfig): Promise<DatabaseDoc> {
    const url = `mongodb://${serverName}/${databaseName}`;
    log(`connecting to '${url}' ... `, )

    const db = await MongoClient.connect(url);
    const collection = await db.collections();
    var collectionNames = collection.map(c => c.collectionName);
    log("all found collections:", collectionNames.join(","));

    if (databaseConfig.__includes) {
        collectionNames = Enumerable.from(collectionNames).intersect(databaseConfig.__includes).toarray();
    } else if (databaseConfig.__excludes) {
        collectionNames = Enumerable.from(collectionNames).except(databaseConfig.__excludes).toarray();
    }

    log("retrieving metadata from collections:", collectionNames.join(","), " ...");

    var docs = await Promise.all(collectionNames.map(cm => getDocForCollection(db.collection(cm), databaseConfig[cm])));
    var result = zipToObject(collectionNames, docs);

    await db.close();

    return result;
}

async function getDocForCollection(collection: Collection, collectionConfig?: CollectionConfig): Promise<CollectionDoc> {
    if (collectionConfig && collectionConfig.discriminator) { // get only one document for each discriminated group 
        const discriminatorValues: any[] = await collection.distinct(collectionConfig.discriminator, {});
        if (discriminatorValues.length === 0) {
            return null;
        }

        log(`values of '${collection.collectionName}.${collectionConfig.discriminator}' discriminator:`, discriminatorValues.join(","));

        var docs = await Promise.all(discriminatorValues.map(dv => collection.find({ [collectionConfig.discriminator]: dv }).limit(1).next()));
        //return Enumerable.from(discriminatorValues).zip(docs, (dv, doc) => ({ dv, doc })).toobject(v => v.dv, v => v.doc);
        return zipToObject(discriminatorValues, docs);
    }

    // get only one document
    const doc = await collection.find({}).limit(1).next();
    return doc;
}

function zipToObject<TKey, TValue>(keys: TKey[], values: TValue[]): { [key: string]: TValue } {
    return Enumerable.from(keys).zip(values, (key, value) => ({ key, value })).toobject(v => v.key, v => v.value);
}
