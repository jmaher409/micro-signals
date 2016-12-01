import {ReadableSignalLike} from './interfaces/signal-like';
import {Signal} from './signal';

export class AnySignal<T> extends Signal<T> {
    constructor(signals: ReadableSignalLike<T>[]) {
        super();
        signals.forEach(signal => signal.add((payload: T) => super.dispatch(payload)));
    }
}
