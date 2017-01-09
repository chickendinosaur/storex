'use strict';

const tap = require('tap');
const test = tap.test;
const beforeEach = tap.beforeEach;
const afterEach = tap.afterEach;
const teardown = tap.teardown;

const TransactionAction = require('../../src/actions/transaction-action');

/*
Setup.
*/

// Call the supplied function before every subsequent descendent test.
beforeEach(function (done) {
	done();
});

// Call the supplied function after every subsequent descendent test.
afterEach(function (done) {
	done();
});

// Run the supplied function when t.end() is called, or when the plan is met.
teardown(function () {});

test('new TransactionAction', function (t) {
	var transactionAction = new TransactionAction();
	t.equal(transactionAction.constructor, TransactionAction, 'TransactionAction instantiates properly.');
	t.end();
});
