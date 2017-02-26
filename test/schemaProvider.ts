import * as assert from "assert";
import * as fs from "fs";
import * as util from "util";
import { Enumerable } from "powerseq";
import { ValuePropertyType, Property, TypePropertyType } from "../src/objectSchemaExtractor";
import { setDiscriminatorValueAsType } from "../src/schemaProvider";

describe("schemaProvider", function () {

    it("setDiscriminatorValueAsType", function () {
        let sampleGenerator = () => <Property[]>[
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

        const expectedType: ValuePropertyType[] = [{ typeKind: "value", typeValue: ["\"xx\""] }];

        let result1 = setDiscriminatorValueAsType(sampleGenerator(), "name", "xx");
        assert.deepEqual(result1[1].types, expectedType);

        let result2 = setDiscriminatorValueAsType(sampleGenerator(), "sub.b", "xx");
        assert.deepEqual((<TypePropertyType>result2[2].types[0]).typeType.properties[1].types, expectedType);
    });

});