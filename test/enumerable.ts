import * as assert from "assert";
import {Enumerable, map, flatmap} from "../code/generators/enumerable";
//import * as async from "async";

describe('enumerable', function () {

    function* return123() : IterableIterator<number>{
        yield 1;
        yield 2;
        yield 3; 
    }

    describe('enumerable functions', function () {
        it('from', function() {
            var result = Enumerable.from([1,2,3]);
            assert.deepEqual(result.toarray(), [1,2,3]);
        });

        it('empty', function() {
            var result = Enumerable.empty<number>();
            assert.deepEqual(result.toarray(), []);
        });
    });


    describe('operators', function () {

        it('toArray', function() {
            assert.deepEqual(Enumerable.from([]).toarray(), []);
            assert.deepEqual(Enumerable.from([1,2,3]).toarray(), [1,2,3]);
            assert.deepEqual(Enumerable.from(return123()).toarray(), [1,2,3]);
        });
        it('map', function() {
            assert.deepEqual(Enumerable.from([1,2,3]).map(x => x+1).toarray(), [2,3,4]);
            assert.deepEqual(Enumerable.from([1,2,3]).map((x,index) => x+index).toarray(), [1,3,5]);
            assert.deepEqual(Array.from(map(return123(), x => x.toString())), ["1", "2", "3"] ); // as standalone operator
        });
        it('filter', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4]).filter(x => x % 2 === 0).toarray(), [2,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).filter((x,index) => index % 2 === 0).toarray(), [1,3]);
        });
        it('take', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4]).take(0).toarray(), []);
            assert.deepEqual(Enumerable.from([1,2,3,4]).take(2).toarray(), [1,2]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).take(10).toarray(), [1,2,3,4]);
        });
        it('skip', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4]).skip(0).toarray(), [1,2,3,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).skip(1).toarray(), [2,3,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).skip(5).toarray(), []);
        });
        it('takewhile', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4]).takewhile( x => true).toarray(), [1,2,3,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).takewhile( x => false).toarray(), []);
            assert.deepEqual(Enumerable.from([1,2,3,4]).takewhile( x => x < 3).toarray(), [1,2]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).takewhile( (x,index) => index < 3).toarray(), [1,2,3]);
        });
        it('skipwhile', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4]).skipwhile( x => true).toarray(), []);
            assert.deepEqual(Enumerable.from([1,2,3,4]).skipwhile( x => false).toarray(), [1,2,3,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).skipwhile( x => x < 3).toarray(), [3,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).skipwhile( (x,index) => index < 3).toarray(), [4]);
        });
        it('flatmap', function() {
            var items = [
                { name:"a", items:[] },
                { name:"b", items:[1] },
                { name:"c", items:[1,2], },
            ]
            assert.deepEqual(Enumerable.from(items).flatmap( x => x.items).toarray(), [1,1,2]);
            assert.deepEqual(Enumerable.from(items).flatmap( (x,index) => [index].concat(x.items)).toarray(), [0, 1,1, 2,1,2]);
            assert.deepEqual(Enumerable.from(items).flatmap( x => x.items, (item, subitem) => item.name + subitem).toarray(), ["b1", "c1","c2"]);
        });
        it('reduce', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4]).reduce((p,c) => p + c), 1+2+3+4);
            assert.throws(() => {
                var r = Enumerable.from([]).reduce( (p,c) => p + c);
            }, "'Sequence contains no elements' exception should be thrown");
            assert.deepEqual(Enumerable.from([1,2,3,4]).reduce((p,c) => ({text:p.text + c}), {text:"-"}), {text:"-1234"});
            assert.deepEqual(Enumerable.from([]).reduce((p,c) => { throw new Error(); }, {text:"-"}), {text:"-"});
        });
        it('groupby', function() {
            assert.deepEqual(Enumerable.from(["a","b","cc", "ddd"]).groupby(x => x.length).map( x => x.key+":"+Array.from(x).join(",")).toarray(), ["1:a,b","2:cc", "3:ddd"]);
            assert.deepEqual(Enumerable.from(["a","b","cc", "ddd"]).groupby(x => x.length, (key, items) => key+":"+Array.from(items).join(",")).toarray(), ["1:a,b","2:cc", "3:ddd"]);
        });
        it('zip', function() {
            assert.deepEqual(Enumerable.from(["a","b","c"]).zip([1,2,3,4,5], [false,true], (s,n,b) => s+n+b).toarray(), ["a1false","b2true"]);
        });
    });

});






// function assertInteration<T1,T2>(actual:Iterable<T1>, expected:Iterable<T2>){
//     var e1 = actual[Symbol.iterator]();
//     var e2 = expected[Symbol.iterator]();
//     while(e1.next)
//     assert.deepEqual
// }
