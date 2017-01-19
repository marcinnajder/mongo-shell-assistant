import * as assert from "assert";
import { extractMatadata } from "../../src/metadata/metadataProvider";


describe('metadataProvider.ts', function () {


    it('should parse all primitive types', async function () {


        


        // var aa = map([1,2,3], (x=>x+1));
        // for(var item of aa){
        //     console.log(item);
        // }
        // function noop(){};

        // var a = parseDocument({}, {
        //     object:new ObjectID(),
        //     binary:new Binary(new Buffer("")),
        //     timestamp:new Timestamp(0,0),
        //     code:new Code(noop),

        //     minKey:new MinKey(),
        //     maxKey:new MaxKey(),

        //     string: "",
        //     number: 123.12,
        //     boolean: false,
        //     date:new Date(),
        //     regex : new RegExp(""),
        //     undefined: undefined,
        //     null: null,
        // });

        // console.log(a);
    });
});


    //     _object : {},
    //     _array: [],
    //     _symbol:Symbol(),
    //     _dbref: DBRef,



// _object __object
// _array __array
// _symbol Code
// _dbref Code




// const typesNames = ["string", "boolean", "number"];
// const types = [ObjectID, Binary, Timestamp, Date, RegExp, MinKey, MaxKey, Code];
// const typeResolvers: ((v) => string)[] = [
//     v => v === null ? "null" : null,
//     v => v === undefined ? "undefined" : null,
//     v => typesNames.find( t => typeof v === t),
//     v => (types.find( t => v instanceof t) || <any> {}).name,
//     v => Array.isArray(v) ? "__array" : null,
//     v => isObject(v) ? "__object" : null,
//     v => "any"
// ]

