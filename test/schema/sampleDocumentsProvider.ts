import * as assert from "assert";
import * as util from "util";
import { Enumerable } from "powerseq";
import { getDocForConfig } from "../../src/schema/sampleDocumentsProvider";
import { Config } from "../../src/schema/configuration";



describe('sampleDocumentProvider', function () {

    it('test123', async function () {

        // todo: dla userow trzeba pobrac wiecej elementow ale dobrac sie do profili, tylko ile i ktorych?? moze mozliwosc wskazania pol ktore dokumento musi posiadac np containsFields = ["patientProfile", "doctorPofile"] ... moze jakos odawa filtr ale ile elemento minimalnie brac ?
        // 

        var config: Config = {
            "localhost:27017": {
                "test2": {
                    __includes: ["entities"],
                    //__includes: ["users", "tickets"]
                    //__excludes: ["alltypes", "users"],
                    configs: {
                        discriminator: "_id"
                    },
                    tasks: {
                        discriminator: "taskType"
                    },
                    contentItems: {
                        discriminator: "type",
                        skipPaths: ["content"]
                    },
                    entities: {
                        discriminator: "type"
                    }
                },
                "test2_new": ["localhost:27017", "test2"]
            }
        };

        var doc = await getDocForConfig(config);
        console.log(util.inspect(doc, true, 100));
    });
});

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


