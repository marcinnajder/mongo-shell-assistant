import * as assert from "assert";
import * as fs from "fs";
import * as util from "util";
import { Property, NamePropertyType, ValuePropertyType, TypePropertyType } from "../src/objectSchemaExtractor";
import { generateDts, flattenCollection } from "../src/dtsGenerator";

describe("dtsGenerator", function () {

    it("flatten", function () {
        let stringType: NamePropertyType[] = [{
            typeKind: "name", typeName: "string"
        }];

        let result = flattenCollection([
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

        ]);

        let expected =
            [{
                propertyName: "id",
                types: [{ typeKind: "name", typeName: "string" }]
            },
            { propertyName: "sub", types: [] },
            {
                propertyName: "sub.a",
                types: [{ typeKind: "name", typeName: "string" }]
            },
            { propertyName: "sub.sub2", types: [] },
            {
                propertyName: "sub.sub2.b",
                types: [{ typeKind: "name", typeName: "string" }]
            }];

        assert.deepEqual(result, expected);
        // console.log(util.inspect(result, { depth: 1000 }));
    });
});