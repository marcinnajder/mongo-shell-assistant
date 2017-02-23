import * as assert from "assert";
import * as util from "util";
import { Enumerable } from "powerseq";
import { MongoClient, Binary, ObjectID, Timestamp, MinKey, MaxKey, Code } from "mongodb";
import { extractSchema, setDefaultExtractOptions, ExtractOptions, simplifySchemaStructure, NamePropertyType } from "../../src/schema/schemaExtractor";

describe('schemaProvider', function () {

    it('should fill up options with default values', function () {
        const defaultOptions: ExtractOptions = {
            depth: Number.MAX_SAFE_INTEGER,
            skipPaths: []
        }
        assert.deepEqual(setDefaultExtractOptions(undefined), defaultOptions);
        assert.deepEqual(setDefaultExtractOptions({}), defaultOptions);
        assert.deepEqual(setDefaultExtractOptions({ depth: 123 }), <ExtractOptions>{ depth: 123, skipPaths: [] });
        assert.deepEqual(setDefaultExtractOptions({ skipPaths: ["a"] }), <ExtractOptions>{ depth: Number.MAX_SAFE_INTEGER, skipPaths: ["a"] });
    });

    it('should extract all kinds of types', function () {
        const allPossibleTypes = {
            "ObjectId": new ObjectID(),
            "Binary": new Binary(new Buffer("")),
            "Timestamp": new Timestamp(0, 0),
            "Code": new Code(() => { }),
            "MinKey": new MinKey(),
            "MaxKey": new MaxKey(),

            'string': "",
            "number": 123.12,
            "boolean": false,
            "undefined": undefined,
            "null": null,

            "Date": new Date(),
            "RegExp": new RegExp(""),
        };

        const schema = extractSchema(allPossibleTypes);
        const simplifiedSchema = simplifySchemaStructure(schema);

        assert.deepEqual(simplifiedSchema, setKeysToValues(allPossibleTypes));
    });


    it('should extract array type', function () {
        const _ = "arrayOfObjects";

        const arrayTypes = {
            "any[]": [],
            "string[]": ["a", "b"],
            [_]: [{
                "number[]": [1, 2, 3],
                "null[]": [null]
            }]
        };

        const schema = extractSchema(arrayTypes);
        const simplifiedSchema = simplifySchemaStructure(schema);

        const arrayTypes_ = arrayTypes[_][0];
        delete arrayTypes[_];
        const schema_ = schema[_];
        delete schema[_];
        const simplifiedSchema_ = simplifiedSchema[_];
        delete simplifiedSchema[_];

        assert.deepEqual(simplifiedSchema, setKeysToValues(arrayTypes));
        assert.deepEqual(simplifiedSchema_["__isarray"], true);
        delete simplifiedSchema_["__isarray"];
        assert.deepEqual(simplifiedSchema_, setKeysToValues(arrayTypes_));
    });


    it('should extract subobjects', function () {
        const subobjects = {
            "empty": {},
            "subobject1": {
                "string": "",
                "subobject2": {
                    "string": "",
                },
            },
        };

        const schema = extractSchema(subobjects);
        const simplifiedSchema = simplifySchemaStructure(schema);
        const expected = { empty: {}, subobject1: { string: 'string', subobject2: { string: 'string' } } };

        assert.deepEqual(simplifiedSchema, expected);
    });

    it('should limit extration to specified depth', function () {
        const subobjects = {
            "string": "",
            "subobject1": {
                "string": "",
                "subobject2": {
                    "string": "",
                }
            }
        };

        var params: [ExtractOptions, any][] = [
            [{ depth: 1 }, { string: 'string', subobject1: 'any' }],
            [{ depth: 2 }, { string: 'string', subobject1: { string: 'string', subobject2: 'any' } }]
        ];

        for (let [options, expected] of params) {
            let schema = extractSchema(subobjects, options);
            let simplifiedSchema = simplifySchemaStructure(schema);
            assert.deepEqual(simplifiedSchema, expected);
        }
    });

    it('should limit extration to specified paths', function () {
        const subobjects = {
            "string": "",
            "subobject1": {
                "string": "",
                "subobject2": {
                    "string": "",
                }
            },
            "array": [{
                "subobject2": {
                    "string": "",
                }
            }]
        };

        var params: [ExtractOptions, any][] = [
            [{ skipPaths: ["subobject1", "array"] }, { string: 'string', subobject1: 'any', array: 'any' }],
            [{ skipPaths: ["subobject1.subobject2", "array"] }, { string: 'string', subobject1: { string: 'string', subobject2: 'any' }, array: 'any' }],
            [{ skipPaths: ["subobject1", "array.subobject2"] }, { string: 'string', subobject1: 'any', array: { subobject2: 'any', __isarray: true } }],
        ];

        for (let [options, expected] of params) {
            let schema = extractSchema(subobjects, options);
            let simplifiedSchema = simplifySchemaStructure(schema);
            assert.deepEqual(simplifiedSchema, expected);
        }
    });
});


function setKeysToValues(obj) {
    return Enumerable.entries(obj).toobject(([key, value]) => key, ([key, value]) => key);
}