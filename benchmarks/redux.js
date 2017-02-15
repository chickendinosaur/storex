require('lodash');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const isBrowser = typeof window === 'object';

if (isBrowser) {
	window.Benchmark = Benchmark;
}

const createStore = require('Redux').createStore;

/*
Setup.
*/

var initialState = {
	a: 1,
	b: 2
};

var reducer = function (state, action) {
	switch (action.type) {
	case 'a':
		return {
			a: action.payload.updated
		}
	case 'b':
		return Object.assign({}, state, {
			b: action.payload.updated
		})
	}
	return state;
};

var subscriber = function (state) {};

var store = createStore(reducer, initialState);
store.subscribe(subscriber);

/*
Teardown
*/

suite
	.add('.createStore(reducer, initialState)', function () {
		createStore(reducer, initialState);
	})
	.add('.dispatch(action)', function () {
		store.dispatch({
			type: 'a',
			payload: {
				updated: true
			}
		})
	})
	.add('.dispatch(action) /w Object.assign', function () {
		store.dispatch({
			type: 'b',
			payload: {
				updated: true
			}
		})
	})
	.on('cycle', function (event) {
		var output = String(event.target);
		output = output.substring(0, output.indexOf('ops/sec') + 7);
		console.log('\x1b[33m%s\x1b[0m', '\t' + output);
	})
	.on('complete', function () {
		if (typeof window === 'object') {
			window.close();
		}
	})
	// Run async
	.run({ 'async': false });
