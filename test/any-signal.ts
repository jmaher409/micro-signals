import {AnySignal} from '../src/any-signal';
import test = require('tape');
import {Signal} from '../src/signal';

const signals: Signal<string>[] = [
    new Signal<string>(),
    new Signal<string>(),
    new Signal<string>(),
    new Signal<string>(),
];

test('any signal addOnce listeners fire when any of the collection of signals dispatches', t => {
    const anySignal = new AnySignal(signals);
    let addOnceCallCount = 0;
    let addCallCount = 0;

    t.plan(5);

    anySignal.addOnce(payload => {
        addOnceCallCount++;
        t.equal(payload, 'foo');
    });

    anySignal.add(payload => {
        addCallCount++;
        t.equal(payload, 'foo');
    });

    signals[2].dispatch('foo');
    signals[2].dispatch('foo');

    t.equal(addCallCount, 2);
    t.equal(addOnceCallCount, 1);
});
