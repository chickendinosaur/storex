'use strict';

module.exports = Reducer;

/**
@class Reducer
@constructor
@param {Object} actionListeners
*/
function Reducer(actionListeners) {
	this._actionListeners = actionListeners;
}
