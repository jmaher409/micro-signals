export type Listener<T> = (payload: T) => void;

export interface BaseSignal<T> {
    add(listener: Listener<T>, ...tags: any[]): void;
    remove(listenerOrTag: any): void;
}

export type Accumulator<T, R> = (result: R | undefined, payload: T) => R;

export interface ReadableSignal<T> extends BaseSignal<T> {
    addOnce(listener: Listener<T>, ...tags: any[]): void;
    cache(cache: Cache<T>): ReadableSignal<T>;
    filter(filter: (payload: T) => boolean): ReadableSignal<T>;
    filter<U extends T>(filter: (payload: T) => payload is U): ReadableSignal<U>;
    map<U>(transform: (payload: T) => U): ReadableSignal<U>;
    merge<U>(...signals: ReadableSignal<U>[]): ReadableSignal<T|U>;
    promisify(rejectSignal?: ReadableSignal<any>): Promise<T>;
    readOnly(): ReadableSignal<T>;
    scan<R>(accumulator: Accumulator<T, R>, seed?: R): ReadableSignal<R>;
}

export interface WritableSignal<T> {
    dispatch: (payload: T) => void;
}

export interface Cache<T> {
    add(payload: T): void;
    forEach(callback: (payload: T) => void): void;
}
