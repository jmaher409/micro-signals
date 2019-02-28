export type Listener<T> = (payload: T) => void;

export interface BaseSignal<T> {
    add(listener: Listener<T>, ...tags: any[]): void;
    remove(listenerOrTag: any): void;
}

export interface ReadableSignal<T> extends BaseSignal<T> {
    addOnce(listener: Listener<T>, ...tags: any[]): void;
    filter<U extends T>(filter: (payload: T) => payload is U): ReadableSignal<U>;
    filter(filter: (payload: T) => boolean): ReadableSignal<T>;
    map<U>(transform: (payload: T) => U): ReadableSignal<U>;
    merge<U>(...signals: ReadableSignal<U>[]): ReadableSignal<T|U>;
    promisify(rejectSignal?: ReadableSignal<any>): Promise<T>;
    readOnly(): ReadableSignal<T>;
    cache(cache: Cache<T>): ReadableSignal<T>;
    /**
     * start piping output of signal into another signal
     *
     * This is a convenience function that makes it easier to chain
     * signals while maintaining add semantics (e.g. caching).
     *
     * The following two examples are equivalent
     * @example
     * // chaining signals without pipe
     *
     * const signalA = new Signal<string>();
     * const signalB = new Signal<string>();
     *
     * signalA.add((payload: string) => signalB.dispatch(payload));
     *
     * // chaining with pipe
     *
     * const signalA = new Signal<string>();
     * const signalB = new Signal<string>();
     *
     * signalA.pipe(signalB);
     *
     * @param signal signal to which dispatched payloads will be piped
     */
    pipe(signal: WritableSignal<T>): void;
    /**
     * stop piping output of signal into another signal
     *
     * @param signal signal to be removed from base signal
     */
    unpipe(signal: WritableSignal<T>): void;
}

export interface WritableSignal<T> {
    dispatch: (payload: T) => void;
}

export interface Cache<T> {
    add(payload: T): void;
    forEach(callback: (payload: T) => void): void;
}
