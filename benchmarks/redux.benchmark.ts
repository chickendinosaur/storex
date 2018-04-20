// @ts-ignore
import Benchmark, { Suite } from 'benchmark';
import * as Table from 'cli-table2';
import * as ora from 'ora';

/*
Benchmark config.
*/

const suite = new Suite();
const isBrowser = typeof window === 'object';
const benchmarkResults = [];
const spinner = ora(`Running benchmark`);

if (isBrowser) {
    // @ts-ignore
    window.Benchmark = Benchmark;
}

function showResults(results) {
    const table = new Table({
        head: [`NAME`, `OPS/SEC`, `RELATIVE MARGIN OF ERROR`, `SAMPLE SIZE`]
    });

    results.forEach((result) => {
        // @ts-ignore
        table.push([
            result.target.name,
            result.target.hz.toLocaleString(`en-US`, { maximumFractionDigits: 0 }),
            `± ${result.target.stats.rme.toFixed(2)}%`,
            result.target.stats.sample.length
        ]);
    });

    // tslint:disable-next-line
    console.log(table.toString());
}

function onComplete() {
    spinner.stop();

    showResults(benchmarkResults);

    if (typeof window === 'object') {
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
    .on('cycle', (event) => {
        benchmarkResults.push(event);
    })
    .on('complete', onComplete)
    // Run async
    .run({ async: false });
