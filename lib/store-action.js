'use strict';

/**
@class Action
@constructor
@param {String|Number} type
@param {*} payload
*/
function Action(type, payload) {
	if (payload === undefined) {
		payload = null;
	}

	if (type === undefined) {
		type = null;
	}

	/**
	@property type
	@type {String|Number}
	*/
	this.type = type;

	/**
	@property payload
	@type {*}
	*/
	this.payload = payload;
}

Action.prototype.constructor = Action;

module.exports = Action;
