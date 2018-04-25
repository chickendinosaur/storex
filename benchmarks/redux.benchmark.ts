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

import { combineReducers, createStore } from 'redux';

import { action1 } from '../mocks/actions';
import { defaultStateCallback } from '../mocks/default-state-callbacks';

const reducer1 = (state = defaultStateCallback(), action) => {
    switch (action.type) {
        case 'ACTION_1':
            return state + action.payload;
        case 'ACTION_2':
            return state + action.payload;
        default:
            return state;
    }
};

const reducer2 = (state = defaultStateCallback(), action) => {
    switch (action.type) {
        case 'ACTION_1':
            return state + action.payload;
        case 'ACTION_2':
            return state + action.payload;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    reducer1,
    reducer2
});

const store = createStore(rootReducer);

store.subscribe(() => {
    const val = store.getState();
});

/*
Teardown
*/

suite
    .add('createStore(combineReducers(reducers))', () => {
        createStore(
            combineReducers({
                reducer1,
                reducer2
            })
        );
    })
    .add('store.dispatch(action)', () => {
        store.dispatch(action1);
    })
    .on('cycle', onCycle)
    .on('complete', onComplete)
    .run({ async: false });
