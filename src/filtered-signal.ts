import {Listener} from './interfaces/listener';
import {SignalBinding} from './interfaces/signal-binding';
import {ReadableSignalLike, SignalLike} from './interfaces/signal-like';
import {Signal} from './signal';

export interface FilterFunction<T> {
    (payload: T): boolean;
}

export class FilteredSignal<T> implements ReadableSignalLike<T> {
    private _forwardedSignal: SignalLike<T>;

    constructor(
        signal: ReadableSignalLike<T>,
        filter: FilterFunction<T> = () => true,
    ) {
        this._forwardedSignal = new Signal<T>();
        signal.add((payload: T) => {
            if (filter(payload)) {
                this._forwardedSignal.dispatch(payload);
            }
        });
    }

    add(listener: Listener<T>): SignalBinding {
        return this._forwardedSignal.add(listener);
    }

    addOnce(listener: Listener<T>): SignalBinding {
        return this._forwardedSignal.addOnce(listener);
    }
}
