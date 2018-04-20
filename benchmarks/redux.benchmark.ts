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

const reducer1 = (
    state = {
        a: 1,
        b: 2
    },
    action
) => {
    switch (action.type) {
        case 'a':
            return {
                ...state,
                a: action.payload.updated
            };
        case 'b':
            return {
                ...state,
                b: action.payload.updated
            };
        default:
            return state;
    }
};

const reducer2 = (
    state = {
        c: 3,
        d: 4
    },
    action
) => {
    switch (action.type) {
        case 'c':
            return {
                ...state,
                c: action.payload.updated
            };
        case 'd':
            return {
                ...state,
                d: action.payload.updated
            };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    '1': reducer1,
    '2': reducer2
});

const store = createStore(rootReducer);

function subscriber() {
    store.getState();
}

store.subscribe(subscriber);

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
        store.dispatch({
            type: 'd',
            payload: {
                updated: true
            }
        });
    })
    .on('cycle', onCycle)
    .on('complete', onComplete)
    .run({ async: false });
