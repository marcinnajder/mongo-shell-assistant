import { MongoClient, Binary, ObjectID, Timestamp, MinKey, MaxKey, Code } from "mongodb";
import { Enumerable } from "powerseq";
import { Dictionary } from "powerseq/common/types";

export interface Type {
    typeName?: string;
    properties: Property[];
    extends?: string[];
}

export interface Property {
    propertyName: string;
    //isOptional?: boolean;
    //isReadonly?: boolean;
    types: PropertyType[];
    // todo: now only OR semantics between types is supported, consider support for AND
}

export type PropertyType = NamePropertyType | ValuePropertyType | TypePropertyType;

// export interface PropertyType {
//     kind: string;
//     isArray?: boolean;
// }

export interface PropertyTypeBase {
    isArray?: boolean;
}

export interface NamePropertyType extends PropertyTypeBase {
    typeKind: "name";
    typeName: string;
}
export interface ValuePropertyType extends PropertyTypeBase {
    typeKind: "value";
    typeValue: string[];
}
export interface TypePropertyType extends PropertyTypeBase {
    typeKind: "type";
    typeType: Type;
}

export interface ExtractOptions {
    depth?: number;
    skipPaths?: string[];
}

export function extractSchema(obj, options?: ExtractOptions): Property[] {
    options = setDefaultExtractOptions(options);
    return extractObjectSchema(obj, options, 1, "");
}


const OBJECT_TYPE = "__object";
//const ARRAY_TYPE = "__array";
const typeNames = ["string", "boolean", "number"];
const typeConstructors = [Binary, Timestamp, Date, RegExp, MinKey, MaxKey, Code];
/** the order of array items  is important */
const typeResolvers: ((v) => string | null)[] = [
    v => v === null ? "null" : null,
    v => v === undefined ? "undefined" : null,
    v => typeNames.find(t => typeof v === t) || null,
    v => v instanceof ObjectID ? "ObjectId" : null, // ObjectID type name has node driver, ObjectId type name has mongo shell
    v => (typeConstructors.find(t => v instanceof t) || <any>{}).name || null,
    //v => Array.isArray(v) ? ARRAY_TYPE : null,
    v => isObject(v) ? OBJECT_TYPE : null,
    v => "any"
];

// UT
export function setDefaultExtractOptions(options: ExtractOptions) {
    var defaultOptions: ExtractOptions = {
        depth: Number.MAX_SAFE_INTEGER,
        skipPaths: []
    };
    if (typeof options === "undefined") {
        return defaultOptions;
    }
    return { ...defaultOptions, ...options };
}

// UT
export function simplifySchemaStructure(schema: Property[]): Dictionary<string | any> {
    return Enumerable.from(schema).toobject(
        p => p.propertyName,
        p => {
            const firstType = p.types[0];
            const arrayPostfix = (firstType.isArray ? "[]" : "");

            if (firstType.typeKind === "type") {
                const dic = simplifySchemaStructure(firstType.typeType.properties);
                if (firstType.isArray) {
                    dic["__isarray"] = true;
                }
                return dic;
            }
            else if (firstType.typeKind === "value") {
                return firstType.typeValue + arrayPostfix;
            }
            else {
                return firstType.typeName + arrayPostfix;
            }
        });
}

function extractObjectSchema(obj, options: ExtractOptions, currentDepth: number, currentPath: string): Property[] {
    const nextCurrentDepth = currentDepth + 1;
    const result: Property[] = [];

    for (const [propertyName, propertyValue] of Enumerable.entries<any>(obj)) {
        const propertyPath = currentPath === "" ? propertyName : currentPath + "." + propertyName;
        const property: Property = {
            propertyName,
            types: []
        };

        if (options.skipPaths.indexOf(propertyPath) !== -1) { // skip property
            property.types.push(<NamePropertyType>{
                typeKind: "name",
                typeName: "any"
            });
            result.push(property);
            continue;
        }

        const isArray = Array.isArray(propertyValue);
        const isEmptyArray = isArray ? propertyValue.length === 0 : false;

        if (isArray && isEmptyArray) { // empty array
            property.types.push(<NamePropertyType>{
                typeKind: "name",
                typeName: "any",
                isArray: true,
            });
            result.push(property);
            continue;
        }

        const value = isArray ? propertyValue[0] : propertyValue;
        const propertyTypeName = Enumerable.from(typeResolvers).map(r => r(value)).find(t => !isNull(t));

        if (isNull(propertyTypeName)) {
            throw new Error(`propery name ${propertyName} has value ${propertyValue} of unknown type`);
        }

        if (propertyTypeName === OBJECT_TYPE) {
            if (nextCurrentDepth > options.depth) {
                property.types.push(<NamePropertyType>{
                    typeKind: "name",
                    typeName: "any"
                });
            }
            else {
                const subschema = extractObjectSchema(value, options, nextCurrentDepth, currentPath === "" ? propertyName : currentPath + "." + propertyName);
                property.types.push(<TypePropertyType>{
                    typeKind: "type",
                    isArray: isArray,
                    typeType: {
                        properties: subschema
                    }
                });
            }
        } else {
            property.types.push(<NamePropertyType>{
                typeKind: "name",
                typeName: propertyTypeName,
                isArray: isArray,
            });
        }
        result.push(property);

    }

    return result;
}



/**https://github.com/jashkenas/underscore/blob/master/underscore.js */
function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}

function isUndefined(obj) {
    return typeof obj === "undefined";
}

function isNull(obj) {
    return obj === null;
}