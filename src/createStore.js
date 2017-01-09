'use strict';

const Store = require('./store');

/**
@method createStore
@param {*} initialState
*/
module.exports = function createStore(initialState) {
	return new Store(initialState);
};
