export declare class Enumerable<T> implements Iterable<T> {
    _iterable: Iterable<T>;
    constructor(_iterable: Iterable<T>);
    [Symbol.iterator]: () => any;
}
export declare type selector<T, TResult> = (item: T, index: number) => TResult;
export declare type predicate<T> = (item: T, index: number) => boolean;
export declare type comparer<T> = (a: T, b: T) => number;
export declare type Dictionary<T> = {
    [key: string]: T;
};
declare module './enumerable' {
    namespace Enumerable {
        function from<T>(iterable: Iterable<T>): Enumerable<T>;
    }
}
export declare function entries<TValue>(obj: any): Iterable<[string, TValue]>;
declare module './enumerable' {
    namespace Enumerable {
        function entries<TValue>(obj: any): Enumerable<[string, TValue]>;
    }
}
export declare function empty<T>(): Iterable<T>;
declare module './enumerable' {
    namespace Enumerable {
        function empty<T>(): Enumerable<T>;
    }
}
export declare function of<T>(...args: T[]): Iterable<T>;
declare module './enumerable' {
    namespace Enumerable {
        function of<T>(...args: T[]): Enumerable<T>;
    }
}
export declare function range<T>(start: number, count: number): Iterable<number>;
declare module './enumerable' {
    namespace Enumerable {
        function range<T>(start: number, count: number): Enumerable<number>;
    }
}
export declare function repeatvalue<T>(value: T, count?: number): Iterable<T>;
declare module './enumerable' {
    namespace Enumerable {
        function repeatvalue<T>(value: T, count?: number): Enumerable<T>;
    }
}
export declare function toarray<T>(source: Iterable<T>): T[];
declare module './enumerable' {
    interface Enumerable<T> {
        toarray(): T[];
    }
}
export declare function tomap<T, TKey>(source: Iterable<T>, keySelector: (item: T) => TKey): Map<TKey, T>;
export declare function tomap<T, TKey, TElement>(source: Iterable<T>, keySelector: (item: T) => TKey, elementSelector: (item: T) => TElement): Map<TKey, TElement>;
declare module './enumerable' {
    interface Enumerable<T> {
        tomap<TKey>(keySelector: (item: T) => TKey): Map<TKey, T>;
        tomap<TKey, TElement>(keySelector: (item: T) => TKey, elementSelector: (item: T) => TElement): Map<TKey, TElement>;
    }
}
export declare function toobject<T>(source: Iterable<T>, keySelector: (item: T) => any): Dictionary<T>;
export declare function toobject<T, TElement>(source: Iterable<T>, keySelector: (item: T) => any, elementSelector: (item: T) => TElement): Dictionary<TElement>;
declare module './enumerable' {
    interface Enumerable<T> {
        toobject(keySelector: (item: T) => any): Dictionary<T>;
        toobject<TElement>(keySelector: (item: T) => any, elementSelector: (item: T) => TElement): Dictionary<TElement>;
    }
}
export declare function map<T, TResult>(source: Iterable<T>, projection: selector<T, TResult>): Iterable<TResult>;
declare module './enumerable' {
    interface Enumerable<T> {
        map<TResult>(projection: selector<T, TResult>): Enumerable<TResult>;
    }
}
export declare function filter<T>(source: Iterable<T>, predicate: predicate<T>): Iterable<T>;
declare module './enumerable' {
    interface Enumerable<T> {
        filter(pedicate: predicate<T>): Enumerable<T>;
    }
}
export declare function take<T>(source: Iterable<T>, count: number): Iterable<T>;
declare module './enumerable' {
    interface Enumerable<T> {
        take(count: number): Enumerable<T>;
    }
}
export declare function skip<T>(source: Iterable<T>, count: number): Iterable<T>;
declare module './enumerable' {
    interface Enumerable<T> {
        skip(count: number): Enumerable<T>;
    }
}
export declare function takewhile<T>(source: Iterable<T>, predicate: predicate<T>): Iterable<T>;
declare module './enumerable' {
    interface Enumerable<T> {
        takewhile(predicate: predicate<T>): Enumerable<T>;
    }
}
export declare function skipwhile<T>(source: Iterable<T>, predicate: predicate<T>): Iterable<T>;
declare module './enumerable' {
    interface Enumerable<T> {
        skipwhile(predicate: predicate<T>): Enumerable<T>;
    }
}
export declare function flatmap<T, TCollection>(source: Iterable<T>, collectionSelector: selector<T, Iterable<TCollection>>): Iterable<TCollection>;
export declare function flatmap<T, TCollection, TResult>(source: Iterable<T>, collectionSelector: selector<T, Iterable<TCollection>>, resultSelector: (item: T, collectionItem: TCollection) => TResult): Iterable<TResult>;
declare module './enumerable' {
    interface Enumerable<T> {
        flatmap<TCollection>(collectionSelector: selector<T, Iterable<TCollection>>): Enumerable<TCollection>;
        flatmap<TCollection, TResult>(collectionSelector: selector<T, Iterable<TCollection>>, resultSelector: (item: T, collectionItem: TCollection) => TResult): Enumerable<TResult>;
    }
}
export declare function reduce<T>(source: Iterable<T>, func: (prev: T, item: T) => T): T;
export declare function reduce<T, TAccumulate>(source: Iterable<T>, func: (prev: TAccumulate, item: T) => TAccumulate, seed: TAccumulate): TAccumulate;
declare module './enumerable' {
    interface Enumerable<T> {
        reduce(func: (prev: T, item: T) => T): T;
        reduce<TAccumulate>(func: (prev: TAccumulate, item: T) => TAccumulate, seed: TAccumulate): TAccumulate;
    }
}
export interface Grouping<TKey, T> extends Iterable<T> {
    key: TKey;
}
export declare function groupby<T, TKey>(source: Iterable<T>, keySelector: (item: T) => TKey): Iterable<Grouping<TKey, T>>;
export declare function groupby<T, TKey, TResult>(source: Iterable<T>, keySelector: (item: T) => TKey, resultSelector: (key: TKey, items: Iterable<T>) => TResult): Iterable<TResult>;
declare module './enumerable' {
    interface Enumerable<T> {
        groupby<TKey>(keySelector: (item: T) => TKey): Enumerable<Grouping<TKey, T>>;
        groupby<TKey, TResult>(keySelector: (item: T) => TKey, resultSelector: (key: TKey, items: Iterable<T>) => TResult): Enumerable<TResult>;
    }
}
export declare function zip<T1, T2, TResult>(source1: Iterable<T1>, source2: Iterable<T2>, func: (item1: T1, item2: T2) => TResult): Iterable<TResult>;
export declare function zip<T1, T2, T3, TResult>(source1: Iterable<T1>, source2: Iterable<T2>, source3: Iterable<T3>, func: (item1: T1, item2: T2, item3: T3) => TResult): Iterable<TResult>;
export declare function zip<T1, T2, T3, T4, TResult>(source1: Iterable<T1>, source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>, func: (item1: T1, item2: T2, item3: T3, item4: T4) => TResult): Iterable<TResult>;
export declare function zip<T1, T2, T3, T4, T5, TResult>(source1: Iterable<T1>, source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>, source5: Iterable<T5>, func: (item1: T1, item2: T2, item3: T3, item4: T4, item5: T5) => TResult): Iterable<TResult>;
export declare function zip(...args: any[]): any;
declare module './enumerable' {
    interface Enumerable<T> {
        zip<T2, TResult>(source2: Iterable<T2>, func: (item1: T, item2: T2) => TResult): Enumerable<TResult>;
        zip<T2, T3, TResult>(source2: Iterable<T2>, source3: Iterable<T3>, func: (item1: T, item2: T2, item3: T3) => TResult): Enumerable<TResult>;
        zip<T2, T3, T4, TResult>(source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>, func: (item1: T, item2: T2, item3: T3, item4: T4) => TResult): Enumerable<TResult>;
        zip<T2, T3, T4, T5, TResult>(source2: Iterable<T2>, source3: Iterable<T3>, source4: Iterable<T4>, source5: Iterable<T5>, func: (item1: T, item2: T2, item3: T3, item4: T4, item5: T5) => TResult): Enumerable<TResult>;
        zip(...args: any[]): any;
    }
}
export declare function sort<T, TKey>(source: Iterable<T>, keySelector: (item: T) => TKey, comparer?: comparer<TKey>): Iterable<T>;
declare module './enumerable' {
    interface Enumerable<T> {
        sort<TKey>(keySelector: (item: T) => TKey, comparer?: comparer<TKey>): Enumerable<T>;
    }
}
export declare function reverse<T>(source: Iterable<T>): Iterable<T>;
declare module './enumerable' {
    interface Enumerable<T> {
        reverse(): Enumerable<T>;
    }
}
export declare function find<T>(source: Iterable<T>, predicate?: predicate<T>): T | undefined;
declare module './enumerable' {
    interface Enumerable<T> {
        find(predicate?: predicate<T>): T | undefined;
    }
}
export declare function findIndex<T>(source: Iterable<T>, predicate: predicate<T>): number | undefined;
declare module './enumerable' {
    interface Enumerable<T> {
        findIndex(predicate: predicate<T>): number | undefined;
    }
}
export declare function every<T>(source: Iterable<T>, predicate: predicate<T>): boolean;
declare module './enumerable' {
    interface Enumerable<T> {
        every(predicate: predicate<T>): boolean;
    }
}
export declare function some<T>(source: Iterable<T>, predicate?: predicate<T>): boolean;
declare module './enumerable' {
    interface Enumerable<T> {
        some(predicate?: predicate<T>): boolean;
    }
}
export declare function concat<T>(...args: Iterable<T>[]): Iterable<T>;
declare module './enumerable' {
    interface Enumerable<T> {
        concat(...args: Iterable<T>[]): Enumerable<T>;
    }
}
export declare function count<T>(source: Iterable<T>, predicate?: predicate<T>): number;
declare module './enumerable' {
    interface Enumerable<T> {
        count(predicate?: predicate<T>): number;
    }
}
export {};
