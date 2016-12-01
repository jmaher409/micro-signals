import {ReadableSignalLike} from './interfaces/signal-like';

export function promisifySignal<T>(
    resolveSignal: ReadableSignalLike<T>,
    rejectSignal?: ReadableSignalLike<T>,
): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        if (rejectSignal) {
            rejectSignal.add(reject);
        }
        resolveSignal.add(resolve);
    });
}
