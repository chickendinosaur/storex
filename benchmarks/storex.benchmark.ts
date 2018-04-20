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

import { createReducer, createStore } from '../src';

const getInitialState1 = () => {
    return {
        a: null,
        b: null
    };
};

const actionMap1 = {
    a: (state, action) => {
        return {
            ...state,
            a: action.payload.updated
        };
    },
    b: (state, action) => {
        return {
            ...state,
            b: action.payload.updated
        };
    }
};

const reducer1 = createReducer('reducer1', getInitialState1, actionMap1);

const getInitialState2 = () => {
    return {
        c: null,
        d: null
    };
};

const actionMap2 = {
    c: (state, action) => {
        return {
            ...state,
            c: action.payload.updated
        };
    },
    d: (state, action) => {
        return {
            ...state,
            d: action.payload.updated
        };
    }
};

const reducer2 = createReducer('reducer2', getInitialState2, actionMap2);

const store = createStore([reducer1, reducer2]);

const subscriber = (state) => {
    return state;
};
store.addSubscriber(subscriber);

/*
Benchmark
*/

suite
    .add('createStore(reducers)', () => {
        createStore([reducer1, reducer2]);
    })
    .add('store.dispatchAction(action)', () => {
        store.dispatchAction({
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
    .run({ async: false });
