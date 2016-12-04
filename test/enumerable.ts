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
            assert.deepEqual(result.toArray(), [1,2,3]);
        });

        it('empty', function() {
            var result = Enumerable.empty<number>();
            assert.deepEqual(result.toArray(), []);
        });
    });


    describe('operators', function () {

        it('toArray', function() {
            assert.deepEqual(Enumerable.from([]).toArray(), []);
            assert.deepEqual(Enumerable.from([1,2,3]).toArray(), [1,2,3]);
            assert.deepEqual(Enumerable.from(return123()).toArray(), [1,2,3]);
        });
        it('map', function() {
            assert.deepEqual(Enumerable.from([1,2,3]).map(x => x+1).toArray(), [2,3,4]);
            assert.deepEqual(Enumerable.from([1,2,3]).map((x,index) => x+index).toArray(), [1,3,5]);
            assert.deepEqual(Array.from(map(return123(), x => x.toString())), ["1", "2", "3"] ); // as standalone operator
        });
        it('filter', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4]).filter(x => x % 2 === 0).toArray(), [2,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).filter((x,index) => index % 2 === 0).toArray(), [1,3]);
        });
        it('take', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4]).take(0).toArray(), []);
            assert.deepEqual(Enumerable.from([1,2,3,4]).take(2).toArray(), [1,2]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).take(10).toArray(), [1,2,3,4]);
        });
        it('skip', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4]).skip(0).toArray(), [1,2,3,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).skip(1).toArray(), [2,3,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).skip(5).toArray(), []);
        });
        it('takewhile', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4]).takewhile( x => true).toArray(), [1,2,3,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).takewhile( x => false).toArray(), []);
            assert.deepEqual(Enumerable.from([1,2,3,4]).takewhile( x => x < 3).toArray(), [1,2]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).takewhile( (x,index) => index < 3).toArray(), [1,2,3]);
        });
        it('skipwhile', function() {
            assert.deepEqual(Enumerable.from([1,2,3,4]).skipwhile( x => true).toArray(), []);
            assert.deepEqual(Enumerable.from([1,2,3,4]).skipwhile( x => false).toArray(), [1,2,3,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).skipwhile( x => x < 3).toArray(), [3,4]);
            assert.deepEqual(Enumerable.from([1,2,3,4]).skipwhile( (x,index) => index < 3).toArray(), [4]);
        });
        it('flatmap', function() {

            var items = [
                {
                    name:"a",
                    items:[],
                },
                {
                    name:"b",
                    items:[1],
                },
                {
                    name:"c",
                    items:[1,2],
                },
            ]

            assert.deepEqual(Enumerable.from(items).flatmap( x => x.items).toArray(), [1,1,2]);
            assert.deepEqual(Enumerable.from(items).flatmap( (x,index) => [index].concat(x.items)).toArray(), [0, 1,1, 2,1,2]);
            assert.deepEqual(Enumerable.from(items).flatmap( x => x.items, (item, subitem) => item.name + subitem).toArray(), ["b1", "c1","c2"]);
        });
    });

});






// function assertInteration<T1,T2>(actual:Iterable<T1>, expected:Iterable<T2>){
//     var e1 = actual[Symbol.iterator]();
//     var e2 = expected[Symbol.iterator]();
//     while(e1.next)
//     assert.deepEqual
// }
