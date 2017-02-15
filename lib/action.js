'use strict';

/**
@class Action
@constructor
@param {String|Number} type
*/

function Action(type, payload) {
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

module.exports = Action;