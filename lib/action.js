'use strict';

/**
@class Action
@constructor
@param {String|Number} type
*/
function Action(type) {
	if (type === undefined) {
		type = null;
	}

	/**
	@property type
	@type {String|Number}
	*/
	this.type = type;
}

Action.prototype.constructor = Action;

module.exports = Action;
