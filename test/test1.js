"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
// //import {Enumerable} from "powerseq";
// import {Enumerable} from "powerseq/enumerable";
// import "powerseq/enumerable/from";
// import "powerseq/operators/filter";
// import "powerseq/operators/toarray";
//import * as async from "async";
describe('generateSchema', function () {
    // before(function() {
    //     return requiresMongoClient();
    // });
    it('should parse all primitive types', function () {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(
            //       Enumerable.from([1,2,3,4,5]).filter(x=>x%2==0).toarray()
            // );
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
