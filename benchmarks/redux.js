require('lodash');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

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
Teardown.
*/

function teardown() {}

console.log('');
console.log('redux.js');
console.log('');

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
		console.log(String(event.target));
		teardown();
	})
	.on('complete', function () {
		if (typeof window === 'object') {
			window.close();
		}
	})
	// Run async
	.run({ 'async': false });
