import { MongoClient, Binary, ObjectID, Timestamp, MinKey, MaxKey, Code } from "mongodb";
// /import {Observable} from "rxjs";

// import { isObject } from "util";


/**https://github.com/jashkenas/underscore/blob/master/underscore.js */
function isObject(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
}


export interface DocumentSchema{
    //[fieldName:string] : (string|string[]|DocumentSchema|DocumentSchema[]|any)[];
    [fieldName:string] : any[];
}

var sample : DocumentSchema = {
    "_id" : ["ObjectID"],
    "name" : ["string"],
    "roles" : [["string"]],
    "adress" :
    [
        {
            "name":["string"]
        }
    ],
}




/** zalozenie jest takie ze tutaj nie przyjdzie null */
export function parseDocument(currentSchema: DocumentSchema, document):DocumentSchema{
    var schema : DocumentSchema = {}

    for(var key of Object.keys(document)){
        var value = document[key];

        typeResolvers.find(r => !!r(value))(value)

        var resolver =  typeResolvers.find(r => !!r(value))
        
        console.log(key, typeResolvers.find(r => !!r(value))(value)) ;
    }

    return schema;
}



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
const types = [Binary, Timestamp, Date, RegExp, MinKey, MaxKey, Code];
/** kolejnosc wpisow w tablicy jest wazna */
const typeResolvers: ((v) => string)[] = [
    v => v === null ? "null" : null,
    v => v === undefined ? "undefined" : null,
    v => typesNames.find( t => typeof v === t),
    v => v instanceof ObjectID ? "ObjectId" : null, // w driverze jest ObjectID a mongo shell jest ObjectId 
    v => (types.find( t => v instanceof t) || <any> {}).name,
    v => Array.isArray(v) ? "__array" : null,
    v => isObject(v) ? "__object" : null,
    v => "any"
]




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





function first<T>(iterable:Iterable<T>, predicate: (item:T) => boolean){
    for(var item of <T[]><any>iterable){
        if(predicate(item)){
            return item;
        }
    }
}



function entries(obj) /*: Iterable<[string,any]>*/{
    var keys = Object.keys(obj);
    var keysCount = keys.length;
    var index=0;
    var key;
    return  {
        [Symbol.iterator](){
            return {
                next: () => {
                    if(index === keysCount ) return {done:true};
                    key = keys[index];
                    return  { value: [key, obj[key] ], done:++index>keysCount};
                }
            }
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
            } else {
                return { done: true };
            }
        }
    });
}




// // kolecja elementow i kazdy posiada dyskryminrator
// var aaa = {
//     hej:[
//         {
//             name:"string",
//             elementType:"bla"
//         },
//         {
//             name:"string",
//             elementType:"bla123"
//         }
//     ]
// }

// jakie scenariusze cms2 mamy:
// - configs - _id ktory jest dyskrymintorem
// - entities, tickets - pole type jest dysktyminatorem, ale inne pola data przechowuje wartosci dedykowane
// - contentItems - jedno pole jest dyskryminatorem,
// - users - tablica rol ktora dodaje dedykowane pola  -> to pewnie mozna zwyczajcie
// - contentItems.content - kolekcja elementow w ktorych jedno pole jest dyskryminatorem


// uwaga: moze warto model danych i generator zrobic tak aby generowanie DTO tym obsluzyc czyli np uwzglenic, opcjonalosc, ..


// aby format zapisywal obiekty DTO
interface Mmmm {
    name:string|Date|null[];
}


var aa : number[];




var model2 = [
    {
        name:"_id",

        isOptional:false, // ?? 
        types: [
            ["string"], "bool", "null", 
            [{
                "name?": ["string", "numer"] 
            }]
        ]
    }
]

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





