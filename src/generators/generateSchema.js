"use strict";
const mongodb_1 = require("mongodb");
// /import {Observable} from "rxjs";
// import { isObject } from "util";
/**https://github.com/jashkenas/underscore/blob/master/underscore.js */
function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}
var sample = {
    "_id": ["ObjectID"],
    "name": ["string"],
    "roles": [["string"]],
    "adress": [
        {
            "name": ["string"]
        }
    ],
};
/** zalozenie jest takie ze tutaj nie przyjdzie null */
function parseDocument(currentSchema, document) {
    var schema = {};
    for (var key of Object.keys(document)) {
        var value = document[key];
        typeResolvers.find(r => !!r(value))(value);
        var resolver = typeResolvers.find(r => !!r(value));
        console.log(key, typeResolvers.find(r => !!r(value))(value));
    }
    return schema;
}
exports.parseDocument = parseDocument;
// _id ObjectId("583f3bd84bf8b2a4eb9027de")
// _string string
// _binData BinData(1,"ABCD")
// _timestamp Timestamp(1480539096, 1)
// _date Wed Nov 30 2016 21:51:36 GMT+0100 (CET)
// _regex /(?:)/
// _idd ObjectId("583f3bd84bf8b2a4eb9027dd")
// _undefined [unknown type]
// _minKey [object MinKey]
// _maxKey [object MaxKey]
// _numberInt 0
// _numberLong NumberLong(0)
// _null [unknown type]
// _boolean true
// _double 1123.123
// _int__ 1123
// _object [object BSON]
// _array
const typesNames = ["string", "boolean", "number"];
const types = [mongodb_1.Binary, mongodb_1.Timestamp, Date, RegExp, mongodb_1.MinKey, mongodb_1.MaxKey, mongodb_1.Code];
/** kolejnosc wpisow w tablicy jest wazna */
const typeResolvers = [
    v => v === null ? "null" : null,
    v => v === undefined ? "undefined" : null,
    v => typesNames.find(t => typeof v === t),
    v => v instanceof mongodb_1.ObjectID ? "ObjectId" : null,
    v => (types.find(t => v instanceof t) || {}).name,
    v => Array.isArray(v) ? "__array" : null,
    v => isObject(v) ? "__object" : null,
    v => "any"
];
// class Enumerable<T>  implements Iterable<T>
// {
//     constructor(private iterable: Iterable<T>){
//     }
//     function* map<T,TResult>(source: Iterable<T>, projection:(item:T) => TResult) : Iterable<TResult>{
// }
// export function map<T,TResult>(source: Iterable<T>, projection:(item:T) => TResult) : Iterable<TResult>{
//     return {
//         [Symbol.iterator]:  function* (){
//             for(var item of source){
//                 yield projection(item);
//             }
//         }
//     };
// }
//var a = new Enumerable<string>(null). 
// var url = 'mongodb://localhost:27017/test2';
// MongoClient.connect(url, function (err, db) {
//     var col = db.collection('alltypes');
//     col.find({}).toArray(function (err, items) {
//         var item = items[0];
//         for(var key of Object.keys(item)){
//             var value = item[key];
//             console.log(key, typeResolvers.find(r => !!r(value))(value)) ;
//         }
//         db.close();
//     });
// });
function first(iterable, predicate) {
    for (var item of iterable) {
        if (predicate(item)) {
            return item;
        }
    }
}
function entries(obj) {
    var keys = Object.keys(obj);
    var keysCount = keys.length;
    var index = 0;
    var key;
    return {
        [Symbol.iterator]() {
            return {
                next: () => {
                    if (index === keysCount)
                        return { done: true };
                    key = keys[index];
                    return { value: [key, obj[key]], done: ++index > keysCount };
                }
            };
        }
    };
}
function objectEntries(obj) {
    let index = 0;
    const propKeys = Reflect.ownKeys(obj);
    return ({
        [Symbol.iterator]() {
            return this;
        },
        next() {
            if (index < propKeys.length) {
                const key = propKeys[index];
                index++;
                return { value: [key, obj[key]] };
            }
            else {
                return { done: true };
            }
        }
    });
}
var aa;
var model2 = [
    {
        name: "_id",
        isOptional: false,
        types: [
            ["string"], "bool", "null",
            [{
                    "name?": ["string", "numer"]
                }]
        ]
    }
];
// interface Bum {
//     _id:ObjectId|null|string[],
// }
// interface BinData{
// }
// interface Timestamp{
// }
// // BSON
// // Type	Number	Alias	Notes
// // Binary data	5	“binData”                       BinData
// // Timestamp	17	“timestamp”	                    Timestamp
// // Date	9	“date”	                                Date
// // Regular Expression	11	“regex”	                RegExp
// // ObjectId	7	“objectId”                          ObjectId
// // Undefined	6	“undefined”	Deprecated.         undefined
// // Min key	-1	“minKey”	                        MinKey
// // Max key	127	“maxKey”	                        MaxKey
// // 32-bit integer	16	“int”	                    NumberInt
// // 64-bit integer	18	“long”	                    NumberLong
// // String	2	“string”	                        string
// // Null	10	“null”                                  null
// // Boolean	8	“bool”	                            Boolean
// // Double	1	“double”	 
// // Object	3	“object”	 
// // Array	4	“array”	 
// // DBPointer	12	“dbPointer”	Deprecated.
// // JavaScript	13	“javascript”	 
// // Symbol	14	“symbol”	Deprecated.
// // JavaScript (with scope)	15	“javascriptWithScope”	 
// // // // // // DBRef("<name>", "<id>")
