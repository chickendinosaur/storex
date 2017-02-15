require('lodash');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

const Store = require('./store');
const TransactionAction = require('./actions/transaction');

/*
Setup.
*/

var initialState = {
	a: 1,
	b: 'b data'
};

var reducer = {
	a: function (state, action) {
		state.a = action.payload.updated;
	},
	b: function (state, action) {
		state.a = action.payload.updated;
	},
	c: function (state, action) {
		state.a = action.payload.updated;
	},
	d: function (state, action) {
		state.a = action.payload.updated;
	},
	e: function (state, action) {
		state.a = action.payload.updated;
	}
};

var subscriber = function (state) {};

var store = new Store(reducer, initialState);
store.addStateListener(subscriber);

/*
Teardown.
*/

function teardown() {}

console.log('');
console.log('Benchmark');
console.log('');
console.log('benchmark/store.js');
console.log('');

suite
	.add('new Store(reducer, initialState)', function () {
		new Store(reducer, initialState);
	})
	.add('.dispatchAction(action1)', function () {
		store.dispatchAction(new TransactionAction('e', {
			updated: true
		}));
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
