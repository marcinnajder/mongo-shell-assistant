export declare class Enumerable<T> implements Iterable<T> {
    _iterable: Iterable<T>;
    constructor(_iterable: Iterable<T>);
    [Symbol.iterator]: () => any;
}
export declare type selector<T, TResult> = (item: T, index: number) => TResult;
export declare type predicate<T> = (item: T, index: number) => boolean;
declare module './enumerable' {
    namespace Enumerable {
        function from<T>(iterable: Iterable<T>): Enumerable<T>;
    }
}
export declare function empty<T>(): Iterable<T>;
declare module './enumerable' {
    namespace Enumerable {
        function empty<T>(): Enumerable<T>;
    }
}
export declare function toArray<T>(source: Iterable<T>): T[];
declare module './enumerable' {
    interface Enumerable<T> {
        toArray(): T[];
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
export {};
