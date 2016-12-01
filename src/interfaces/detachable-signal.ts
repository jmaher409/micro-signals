import {Listener} from './listener';

export interface DetachableSignal<T> {
    detachAll: () => void;
    detach: (listener: Listener<T>) => void;
}
