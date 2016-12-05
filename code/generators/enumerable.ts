// - chodzi na ES6
// - https://github.com/ReactiveX/IxJS/tree/master/iterable
// - jak zrobic aby linq chodzilo w mongo shell ? modul UMD ? czy tam sa generatory ?
// -- generatory i lamby dzialaja, tylko jesli piszemy modulowo ES6 kod, to kod JS sie gubi w mongo shell nie ma modulowosc
// (pewnie jakos sprytnie trzeba wspoldzieli kod, ale miec 2 modulwosci; nalezy pamietac ze dziala JS to jedno,
// ale jeszcze musi dzialac TS)


// todo: fromObject, toObject



export class Enumerable<T> implements Iterable<T>{
    constructor(public _iterable:Iterable<T>){
    }
    [Symbol.iterator] = function(){
        return this._iterable[Symbol.iterator]();
    };
}

export type selector<T,TResult> = (item:T,index:number) => TResult;
export type predicate<T> = (item:T, index:number) => boolean;


//////////////////////////////////////////////////////////////////////////////////////////
declare module './enumerable' {
    namespace Enumerable {
        function from<T>(iterable: Iterable<T>):Enumerable<T>; 
    }
}
Enumerable.from = function<T>(iterable: Iterable<T>):Enumerable<T>{
    return new Enumerable<T>(iterable);
}


//////////////////////////////////////////////////////////////////////////////////////////
export function* empty<T>() : Iterable<T>{
}
declare module './enumerable' {
    namespace Enumerable {
        //export let empty :  <T>(item :T ) => string;
        export function empty<T>():Enumerable<T>; 
    }
}
Enumerable.empty = function <T>() : Enumerable<T>{
    return new Enumerable<T>(empty<T>());
}


//////////////////////////////////////////////////////////////////////////////////////////
export function toarray<T>(source: Iterable<T>) : T[]{
    if(Array.isArray(source)){
        return source;
    }
    var result:T[] = [];
    for(var item of source){
        result.push(item);
    }
    return result;  
}
declare module './enumerable' {
    interface Enumerable<T> {
       toarray():T[]
    }
}
Enumerable.prototype.toarray = function<T>(this:Enumerable<T>) {
    return toarray(this._iterable); 
};



//////////////////////////////////////////////////////////////////////////////////////////
export function* map<T,TResult>(source: Iterable<T>, projection:selector<T,TResult>) : Iterable<TResult>{
    var index = 0;
    for(var item of source){
        yield projection(item, index++);
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        map<TResult>(projection:selector<T,TResult>):Enumerable<TResult>;
    }
}
Enumerable.prototype.map = function<T,TResult>(this:Enumerable<T>, projection:selector<T,TResult>) {
    return new Enumerable<TResult>(map(this,projection)); 
};




//////////////////////////////////////////////////////////////////////////////////////////
export function* filter<T>(source: Iterable<T>, predicate:predicate<T>) : Iterable<T>{
    var index = 0;
    for(var item of source){
        if(predicate(item, index++)){
            yield item;
        }
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        filter(pedicate:predicate<T>):Enumerable<T>;
    }
}
Enumerable.prototype.filter = function<T>(this:Enumerable<T>, predicate:predicate<T>) {
    return new Enumerable<T>(filter(this,predicate)); 
};


//////////////////////////////////////////////////////////////////////////////////////////
export function* take<T>(source: Iterable<T>, count:number) : Iterable<T>{
    if(count>0){
        for(var item of source){
            yield item;
            if(--count === 0) break;
        }
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        take(count:number):Enumerable<T>;
    }
}
Enumerable.prototype.take = function<T>(this:Enumerable<T>, count:number) {
    return new Enumerable<T>(take<T>(this,count)); 
};


//////////////////////////////////////////////////////////////////////////////////////////
export function* skip<T>(source: Iterable<T>, count:number) : Iterable<T>{
    if(count>=0){
        var iterator = source[Symbol.iterator]();
        var value : IteratorResult<T>;

        var i=0;
        while(i++<count){
            value = iterator.next();
            if(value.done) return;
        }

        while(true){
            var value = iterator.next();
            if(value.done) return;
            yield value.value;
        }
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        skip(count:number):Enumerable<T>;
    }
}
Enumerable.prototype.skip = function<T>(this:Enumerable<T>, count:number) {
    return new Enumerable<T>(skip<T>(this,count)); 
};


//////////////////////////////////////////////////////////////////////////////////////////
export function* takewhile<T>(source: Iterable<T>, predicate:predicate<T>) : Iterable<T>{
    let index = 0;
    for(var item of source){
        if(!predicate(item, index++)){
            break;
        }
        yield item;
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        takewhile(predicate:predicate<T>):Enumerable<T>;
    }
}
Enumerable.prototype.takewhile = function<T>(this:Enumerable<T>, predicate:predicate<T>) {
    return new Enumerable<T>(takewhile(this,predicate)); 
};



//////////////////////////////////////////////////////////////////////////////////////////
export function* skipwhile<T>(source: Iterable<T>, predicate:predicate<T>) : Iterable<T>{
    var iterator = source[Symbol.iterator]();
    var value : IteratorResult<T>;
    var index = 0;

    while(true){
        value = iterator.next();
        if(value.done) return;
        if(predicate(value.value,index++)) continue;
        yield value.value;
        break;
    }

    while(true){
        var value = iterator.next();
        if(value.done) return;
        yield value.value;
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        skipwhile(predicate:predicate<T>):Enumerable<T>;
    }
}
Enumerable.prototype.skipwhile = function<T>(this:Enumerable<T>, predicate:predicate<T>) {
    return new Enumerable<T>(skipwhile(this,predicate)); 
};



//////////////////////////////////////////////////////////////////////////////////////////
export function flatmap<T,TCollection>(source: Iterable<T>, collectionSelector:selector<T, Iterable<TCollection>>) : Iterable<TCollection>;
export function flatmap<T,TCollection, TResult>(source: Iterable<T>, collectionSelector:selector<T, Iterable<TCollection>>, resultSelector: (item:T, collectionItem:TCollection) => TResult) : Iterable<TResult>;
export function* flatmap<T,TCollection, TResult>(source: Iterable<T>, collectionSelector:selector<T, Iterable<TCollection>>, resultSelector?: (item:T, collectionItem:TCollection) => TResult) : Iterable<TResult>{
    var index = 0; 
    if(typeof resultSelector === "undefined"){
        for(let item of source){
            let collection = collectionSelector(item, index++);
            yield* <any> collection;
        }
    }
    else{
        for(let item of source){
            let collection = collectionSelector(item, index++);
            for(let collectionItem of collection){
                yield resultSelector(item, collectionItem);
            }
        }
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        flatmap<TCollection>(collectionSelector:selector<T, Iterable<TCollection>>) : Enumerable<TCollection>;
        flatmap<TCollection, TResult>(collectionSelector:selector<T, Iterable<TCollection>>, resultSelector: (item:T, collectionItem:TCollection) => TResult) : Enumerable<TResult>;
    }
}
Enumerable.prototype.flatmap = function<T,TCollection, TResult>(this:Enumerable<T>, collectionSelector:selector<T, Iterable<TCollection>>, resultSelector?: (item:T, collectionItem:TCollection) => TResult) : Enumerable<TResult>{
    return new Enumerable<TResult>(flatmap(this,collectionSelector, resultSelector)); 
};


//////////////////////////////////////////////////////////////////////////////////////////
export function reduce<T>(source: Iterable<T>, func:(prev:T, item:T) => T) : T;
export function reduce<T,TAccumulate>(source: Iterable<T>, func:(prev:TAccumulate, item:T) => TAccumulate, seed:TAccumulate) : TAccumulate;
export function reduce<T,TAccumulate>(source: Iterable<T>, func:(prev:TAccumulate, item:T) => TAccumulate, seed?:TAccumulate) : TAccumulate{
    var iterator = source[Symbol.iterator]();
    var value : IteratorResult<T>;
    var accumulator = seed;
    var valueIsSet = typeof seed !== "undefined";

    if(typeof seed === "undefined"){
        value = iterator.next();
        if(value.done) throw new TypeError('Sequence contains no elements')
        accumulator = <any> value.value;
    }

    while(true){
        value = iterator.next();
        if(value.done) break;

        accumulator = func(accumulator, value.value);
    }

    return accumulator;
}

declare module './enumerable' {
    interface Enumerable<T> {
        reduce(func:(prev:T, item:T) => T) : T;
        reduce<TAccumulate>(func:(prev:TAccumulate, item:T) => TAccumulate, seed:TAccumulate) : TAccumulate;    
    }
}
Enumerable.prototype.reduce = function<T,TAccumulate>(this: Enumerable<T>, func:(prev:TAccumulate, item:T) => TAccumulate, seed?:TAccumulate) : TAccumulate{
    return reduce(this,func,seed); 
};


//////////////////////////////////////////////////////////////////////////////////////////
export interface Grouping<TKey,T> extends Iterable<T> {
    key:TKey
}

export function groupby<T,TKey>(source: Iterable<T>, keySelector:(item:T) => TKey) : Iterable<Grouping<TKey,T>>;
export function groupby<T,TKey,TResult>(source: Iterable<T>, keySelector:(item:T) => TKey, resultSelector:(key:TKey, items:Iterable<T>) => TResult) : Iterable<TResult>;
export function* groupby<T,TKey,TResult>(source: Iterable<T>, keySelector:(item:T) => TKey, resultSelector?:(key:TKey, items:Iterable<T>) => TResult) : Iterable<TResult>{
    var map = new Map<TKey, T[]>();
    var key:TKey, items:T[];

    for(var item of source){
        key = keySelector(item);
        items = map.get(key);
        if(typeof items === "undefined"){
            map.set(key, [item]);
        }else{
            items.push(item);
        }
    }

    if(typeof resultSelector === "undefined"){
        for(var [entryKey, entryValue] of map.entries()){
            yield <any> <Grouping<TKey,T>> {
                key:entryKey,
                [Symbol.iterator]: () => entryValue[Symbol.iterator]()
            }
        }
    }
    else{
        for(var [entryKey, entryValue] of map.entries()){
            yield resultSelector(entryKey, entryValue);
        }
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        groupby<TKey>(keySelector:(item:T) => TKey) : Enumerable<Grouping<TKey,T>>;
        groupby<TKey,TResult>(keySelector:(item:T) => TKey, resultSelector:(key:TKey, items:Iterable<T>) => TResult) : Enumerable<TResult>;
    
    }
}
Enumerable.prototype.groupby = function<T,TKey, TResult>(this:Enumerable<T>, keySelector:(item:T) => TKey, resultSelector?:(key:TKey, items:Iterable<T>) => TResult) : Enumerable<TResult>{
    return new Enumerable<TResult>(groupby(this,keySelector, resultSelector)); 
};







export function zip<T1,T2,TResult>(source1: Iterable<T1>, source2:Iterable<T2>, func: (item1:T1, item2:T2) => TResult): Iterable<TResult>;
export function zip<T1,T2,T3,TResult>(source1: Iterable<T1>, source2:Iterable<T2>, source3:Iterable<T3>, func: (item1:T1, item2:T2,item3:T3) => TResult): Iterable<TResult>;
export function zip<T1,T2,T3,T4,TResult>(source1: Iterable<T1>, source2:Iterable<T2>, source3:Iterable<T3>, source4:Iterable<T4>,func: (item1:T1, item2:T2,item3:T3,item4:T4) => TResult): Iterable<TResult>;
export function zip<T1,T2,T3,T4,T5,TResult>(source1: Iterable<T1>, source2:Iterable<T2>, source3:Iterable<T3>, source4:Iterable<T4>, source5:Iterable<T5>,func: (item1:T1, item2:T2,item3:T3,item4:T4,item5:T5) => TResult): Iterable<TResult>;
export function zip(...args):any;
export function* zip<TResult>(...args): Iterable<TResult>{
    var iterators = args.slice(0,args.length-1).map( (i:Iterable<any>) => i[Symbol.iterator]() );
    var func : Function = args[args.length-1];
    var values : IteratorResult<any>[];

    while(true){
        values = iterators.map( i => i.next());
        if(values.some( x => x.done)) break;
        yield func.apply(null, values.map(x=>x.value));
    }
}
declare module './enumerable' {
    interface Enumerable<T> {
        zip<T2,TResult>(source2:Iterable<T2>, func: (item1:T, item2:T2) => TResult): Enumerable<TResult>;
        zip<T2,T3,TResult>(source2:Iterable<T2>, source3:Iterable<T3>, func: (item1:T, item2:T2,item3:T3) => TResult): Enumerable<TResult>;
        zip<T2,T3,T4,TResult>(source2:Iterable<T2>, source3:Iterable<T3>, source4:Iterable<T4>,func: (item1:T, item2:T2,item3:T3,item4:T4) => TResult): Enumerable<TResult>;
        zip<T2,T3,T4,T5,TResult>(source2:Iterable<T2>, source3:Iterable<T3>, source4:Iterable<T4>, source5:Iterable<T5>,func: (item1:T, item2:T2,item3:T3,item4:T4,item5:T5) => TResult): Enumerable<TResult>;
        zip(...args):any;    
    }
}
Enumerable.prototype.zip = function<T>(this:Enumerable<T>, ...args):Enumerable<any>{
    return new Enumerable<any>(zip.apply(null, [this, ...args])); 
};




