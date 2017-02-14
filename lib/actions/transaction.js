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
	Action.call(this, type, payload);

	/**
	@property status
	@type {*}
	*/
	this.status = status;
}

TransactionAction.prototype = Object.create(Action.prototype);
TransactionAction.prototype.constructor = TransactionAction;

module.exports = TransactionAction;
