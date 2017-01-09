'use strict';

const StoreAction = require('../store-action');

/**
@class TransactionAction
@constructor
@param {String|Number} type
@param {*} payload
@param {String|Number} status
*/
function TransactionAction(type, payload, status) {
	StoreAction.call(this, type, payload);

	if (status === undefined) {
		status = null;
	}

	/**
	@property status
	@type {*}
	*/
	this.status = status;
}

TransactionAction.prototype = Object.create(StoreAction.prototype);
TransactionAction.prototype.constructor = TransactionAction;

module.exports = TransactionAction;
