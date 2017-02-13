import * as assert from "assert";
import * as fs from "fs";
import * as util from "util";
import { Enumerable } from "powerseq";
import { getDoc } from "../../src/schema/sampleDocumentsProvider";
import { Config } from "../../src/schema/configuration";
import { getSchema, setDiscriminatorValueAsType } from "../../src/schema/schemaProvider";
import { Property, NamePropertyType, ValuePropertyType, TypePropertyType } from "../../src/schema/schemaExtractor";
import { generateDts, flattenCollection } from "../../src/schema/dtsGenerator";

//https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-class-d-ts.html

describe('sampleDocumentProvider', function () {

    it('test123', async function () {

        // todo: dla userow trzeba pobrac wiecej elementow ale dobrac sie do profili, tylko ile i ktorych?? moze mozliwosc wskazania pol ktore dokumento musi posiadac np containsFields = ["patientProfile", "doctorPofile"] ... moze jakos odawa filtr ale ile elemento minimalnie brac ?
        // 

        var config: Config = {
            "localhost:27017": {
                "test2": {

                    __includes: [],
                    //__includes: ["contentItems"],

                    //__includes: ["users", "tickets", "albums"],

                    //__includes: ["configs", "entities"],
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
                "test2_new": ["localhost:27017", "test2"],
                "sampledb": {
                    multimedia: {
                        discriminator: "type"
                    },
                }
            }
        };

        var doc = await getDoc(config);
        //console.log(util.inspect(doc, true, 100));

        var schema = getSchema(config, doc);
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


        var src = generateDts(schema);
        console.log(src);
        fs.writeFileSync("./src/shell/generated.d.ts", src);
    });


    it('flatten', function () {
        var stringType: NamePropertyType[] = [{
            typeKind: "name", typeName: "string"
        }];

        var result = flattenCollection([
            {
                propertyName: "id",
                types: stringType
            },
            {
                propertyName: "sub",
                types: [
                    {
                        typeKind: "type",
                        typeType: {
                            properties: [
                                {
                                    propertyName: "a",
                                    types: stringType
                                },
                                {
                                    propertyName: "sub2",
                                    types: [
                                        {
                                            typeKind: "type",
                                            typeType: {
                                                properties: [
                                                    {
                                                        propertyName: "b",
                                                        types: stringType
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                ]
            },

        ])

        var expected =
            [{
                propertyName: 'id',
                types: [{ typeKind: 'name', typeName: 'string' }]
            },
            { propertyName: 'sub', types: [] },
            {
                propertyName: 'sub.a',
                types: [{ typeKind: 'name', typeName: 'string' }]
            },
            { propertyName: 'sub.sub2', types: [] },
            {
                propertyName: 'sub.sub2.b',
                types: [{ typeKind: 'name', typeName: 'string' }]
            }];


        assert.deepEqual(result, expected);
        //console.log(util.inspect(result, { depth: 1000 }));
    });

    it('setDiscriminatorValueAsType', function () {
        var sampleGenerator = () => <Property[]>[
            { propertyName: "id", types: [] },
            { propertyName: "name", types: [] },
            {
                propertyName: "sub", types: [{
                    typeKind: "type",
                    typeType: {
                        properties: [
                            { propertyName: "a", types: [] },
                            { propertyName: "b", types: [] }
                        ]
                    }
                }]
            },
        ];

        const expectedType: ValuePropertyType[] = [{ typeKind: 'value', typeValue: ['"xx"'] }];

        var result1 = setDiscriminatorValueAsType(sampleGenerator(), "name", "xx");
        assert.deepEqual(result1[1].types, expectedType);

        var result2 = setDiscriminatorValueAsType(sampleGenerator(), "sub.b", "xx");
        assert.deepEqual((<TypePropertyType>result2[2].types[0]).typeType.properties[1].types, expectedType);
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


