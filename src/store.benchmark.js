require('lodash');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;
const isBrowser = typeof window === 'object';

if (isBrowser) {
	window.Benchmark = Benchmark;
}

const Store = require('./store');
const TransactionAction = require('./actions/transaction');

/*
Setup.
*/

var initialState = {
	a: 1
};

var reducer = {
	a: function (state, action) {
		state.a = action.payload.updated;
	}
};

var subscriber = function (state) {};

var store = new Store(reducer, initialState);
store.addStateListener(subscriber);

/*
Benchmark
*/

suite
	.add('new Store(reducer, initialState)', function () {
		new Store(reducer, initialState);
	})
	.add('.dispatchAction(action)', function () {
		store.dispatchAction(new TransactionAction('e', {
			updated: true
		}));
	})
	.on('cycle', function (event) {
		var output = String(event.target);
		output = output.substring(0, output.indexOf('ops/sec') + 7);
		console.log('\x1b[33m%s\x1b[0m', '\t' + output);
	})
	.on('complete', function () {
		if (isBrowser) {
			window.close();
		}
	})
	// Run async
	.run({ 'async': false });
