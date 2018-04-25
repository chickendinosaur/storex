// @ts-ignore
import Benchmark, { Suite } from 'benchmark';

/*
Benchmark config.
*/

const suite = new Suite();
const isBrowser = typeof window === 'object';

if (isBrowser) {
    // @ts-ignore
    window.Benchmark = Benchmark;
}

function onCycle(event) {
    let output = String(event.target);
    output = output.substring(0, output.indexOf('ops/sec') + 7);
    // tslint:disable-next-line
    console.log('\x1b[33m%s\x1b[0m', output);
}

function onComplete() {
    if (isBrowser) {
        window.close();
    }
}

/*
Setup.
*/

import { createReducer, createStore } from '../src';

import { action1 } from '../mocks/actions';
import { reducer1, reducer2 } from '../mocks/reducers';

const store = createStore([reducer1, reducer2]);

store.addSubscriber((state) => {
    const val = state.reducer1;
});

/*
Benchmark
*/

suite
    .add('createStore(reducers)', () => {
        createStore([reducer1, reducer2]);
    })
    .add('store.dispatchAction(action)', () => {
        store.dispatchAction(action1);
    })
    .on('cycle', onCycle)
    .on('complete', onComplete)
    .run({ async: false });
