'use strict';

const Action = require('../action');

/**
@class TransactionAction
@constructor
@param {String|Number} type
@param {*} payload
@param {String|Number} status
*/
function TransactionAction(type, payload, status) {
	Action.call(this, type);

	if (payload === undefined) {
		payload = null;
	}

	if (status === undefined) {
		status = null;
	}

	/**
	@property status
	@type {*}
	*/
	this.status = status;

	/**
	@property payload
	@type {*}
	*/
	this.payload = payload;
}

TransactionAction.prototype = Object.create(Action.prototype);
TransactionAction.prototype.constructor = TransactionAction;

module.exports = TransactionAction;
