require('lodash');
Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

const Store = require('../src/store');
const TransactionAction = require('../src/actions/transaction-action');

/*
Setup.
*/

var initialState = {
	a: 1,
	b: 'b data',
	c: 'c'
};

var reducer = {
	a: function (state, action) {
		state.a = action.payload.updated;
		this.setState(state);
	}
};

var subscriber = function (state) {
	state.c = true;
};

var store = new Store(reducer, initialState);
store.addSubscriber(subscriber);

/*
Teardown.
*/

function teardown() {}

console.log('');
console.log('Benchmark');
console.log('');
console.log('benchmark/store.benchmark.js');
console.log('');

suite
	.add('new Store(initialState)', function () {
		new Store(initialState);
	})
	.add('.dispatchAction(action1) w/ .setState(state)', function () {
		store.dispatchAction(new TransactionAction('a', {
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
