import * as fs from "fs";
import { generateTsDeclarations, Config, ServerConfig, DatabaseConfig } from "./index";
import { log, warn, error } from "./logger";
import { EOL } from "os";
import { join } from "path";
import { Enumerable, entries } from "powerseq";

/** mongo shell assistant command line tool */
export function msa() {
    generateMetadata().catch(err => {
        error(err);
    });
}

export async function generateMetadata() {
    const configFileName = "msa.config.json";
    const metadataFileName = "msa.metadata.d.ts";

    if (!fs.existsSync(configFileName)) {
        await p(c => fs.writeFile(configFileName, JSON.stringify(getDefaultConfig(), null, "\t"), c));
        warn(`'${configFileName}' configuration file not found`)
        warn(`'${configFileName}' file with sample configuration has been created`)
    } else {
        let configFileContent = await p<string>(c => fs.readFile(configFileName, "utf-8", c));
        let config: Config = JSON.parse(configFileContent);
        let generatedTsDeclarations = await generateTsDeclarations(config);
        let mongoShellDTsFilePath = Enumerable
            .of("./src/mongoShell.d.ts", "../../src/mongoShell.d.ts")
            .map(pf => join(__dirname, pf))
            .find(fs.existsSync);
        let mongoShellTsDeclarations = await p<string>(c => fs.readFile(mongoShellDTsFilePath, "utf-8", c));

        p(c => fs.writeFile(metadataFileName, mongoShellTsDeclarations + EOL + generatedTsDeclarations, c));

        // find first database inside configuration file
        var firstDatabase = Enumerable
            .entries<ServerConfig>(config)
            .flatmap(
            ([serverName, serverConfig]) => entries<DatabaseConfig>(serverConfig),
            ([serverName, serverConfig], [databaseName, databaseConfig]) => ({ serverName, databaseName, databaseConfig }))
            .find(db => !Array.isArray(db.databaseConfig));

        var code = "";
        if (firstDatabase) {
            code = `var db = new Mongo("${firstDatabase.serverName}").getDB("${firstDatabase.databaseName}");
print(db.getCollectionNames());
//var data = db.__collection1__.find({}, {}).limit(10).toArray();
//printjson(data);
`;
        }

        log(`
'${metadataFileName}' file has been generated.
Add lines below at the beginning of you mongo shell script file:

/// <reference path="./${metadataFileName}" />
${code}
`);
    }
}

// /// <reference path="./node_modules/mongo-shell-assistant/s.d.ts" />
// load("node_modules/mongo-shell-assistant/s.js");



function getDefaultConfig(): Config {
    return {
        "localhost:27017": {
            "database1": {
            },
            "database2": {
                __includes: ["collection1", "collection2"],
                "collection1": {
                    discriminator: "discriminatorfield1"
                }
            },
            "database3": ["localhost:27017", "database1"]
        }
    }
}





/** converts callbacks to promises */
function p<T>(asyncBody: (c) => void): Promise<T> {
    return new Promise<T>(function (executor, reject) {
        try {
            asyncBody(function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    executor(data);
                }
            })
        }
        catch (err) {
            reject(err);
        }
    });
}

//  let config: Config = {
//         "localhost:27017": {
//             "test2": {
//                 __excludes: ["alltypes", "system.users"],
//                 // __includes: [],
//                 // __includes: ["contentItems"],

//                 // __includes: ["users", "tickets", "albums"],

//                 // __includes: ["configs", "entities"],
//                 // __excludes: ["alltypes", "users"],
//                 configs: {
//                     discriminator: "_id"
//                 },
//                 tasks: {
//                     discriminator: "taskType"
//                 },
//                 contentItems: {
//                     discriminator: "type",
//                     skipPaths: ["content"]
//                 },
//                 entities: {
//                     discriminator: "type"
//                 }
//             },
//             "test2_new": ["localhost:27017", "sampledb"],
//             "test2_new2": ["localhost:27017", "test2_new"],
//             "sampledb": {
//                 multimedia: {
//                     discriminator: "type"
//                 },
//             }
//         }
//     };