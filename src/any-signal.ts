import {DetachableSignal} from './interfaces/detachable-signal';
import {Listener} from './interfaces/listener';
import {ReadableSignalLike} from './interfaces/signal-like';
import {Signal} from './signal';

import {SignalBinding} from './interfaces/signal-binding';

export class AnySignal<T> implements ReadableSignalLike<T>, DetachableSignal<T> {
    private _signal = new Signal<T>();

    constructor(...signals: ReadableSignalLike<T>[]) {
        signals.forEach(signal => signal.add((payload: T) => this._signal.dispatch(payload)));
    }

    add(listener: Listener<T>): SignalBinding {
        return this._signal.add(listener);
    }

    addOnce(listener: Listener<T>): SignalBinding {
        const binding = this._signal.add((payload: T) => {
            binding.detach();
            listener(payload);
        });

        return binding;
    }

    detachAll() {
        this._signal.detachAll();
    }

    detach(listener: Listener<T>) {
        this._signal.detach(listener);
    }
}
