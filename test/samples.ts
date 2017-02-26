import * as assert from "assert";
import * as fs from "fs";
import * as util from "util";
import { Enumerable } from "powerseq";
import { getDoc } from "../src/sampleDocumentsProvider";
import { Config } from "../src/configuration";
import { getSchema, setDiscriminatorValueAsType } from "../src/schemaProvider";
import { Property, NamePropertyType, ValuePropertyType, TypePropertyType } from "../src/objectSchemaExtractor";
import { generateDts, flattenCollection } from "../src/dtsGenerator";


describe("samples", function () {

    it("test123", async function () {

        let config: Config = {
            "localhost:27017": {
                "test2": {
                    __excludes: ["alltypes", "system.users"],
                    // __includes: [],
                    // __includes: ["contentItems"],

                    // __includes: ["users", "tickets", "albums"],

                    // __includes: ["configs", "entities"],
                    // __excludes: ["alltypes", "users"],
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
                "test2_new": ["localhost:27017", "sampledb"],
                "test2_new2": ["localhost:27017", "test2_new"],
                "sampledb": {
                    multimedia: {
                        discriminator: "type"
                    },
                }
            }
        };


        let doc = await getDoc(config);
        // console.log(util.inspect(doc, true, 100));

        let schema = getSchema(config, doc);
        console.log(util.inspect(schema, true, 100));



        // { 'localhost:27017':
        //    { test2:
        //       { users:
        //          [ { propertyName: '_id',

        // var aa: Property = schema["localhost:27017"]["test2"]["users"][0];
        // aa.types.push(
        //     {
        //         typeKind: "name",
        //         typeName: "number"
        //     },
        //     {
        //         typeKind: "name",
        //         typeName: "Date",
        //         isArray: true
        //     },
        //     {
        //         typeKind: "value",
        //         typeValue: ["1", "2", "3"]
        //     },
        //     {
        //         typeKind: "type",
        //         isArray: true,
        //         typeType: {
        //             properties: [
        //                 {
        //                     propertyName: "name",
        //                     types: [{
        //                         typeKind: "name",
        //                         typeName: "number"
        //                     }],
        //                 },
        //                 {
        //                     propertyName: "sub",
        //                     types: [{
        //                         typeKind: "type",
        //                         typeType: {
        //                             properties: [
        //                                 {
        //                                     "propertyName": "_o_",
        //                                     types: [
        //                                         {
        //                                             typeKind: "name",
        //                                             typeName: "boolean"
        //                                         }
        //                                     ]
        //                                 }
        //                             ]
        //                         }
        //                     }],
        //                 },
        //             ]
        //         }
        //     },
        // );


        let src = generateDts(schema);
        console.log(src);
        fs.writeFileSync("./samples/msa.metadata.d.ts", src);
    });
});