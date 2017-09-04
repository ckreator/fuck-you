const _ = require('lodash');

function valueObject(scope) {
  return Object.keys(scope).reduce((out, current) => {
    if (_.isObject(scope[current]) && _.isFunction(scope[current].func)) {
      return out;
    }

    out[current] = JSON.parse(JSON.stringify(scope[current]));
    return out;
  }, {});
}

/**
 * Creates a new Scope Object
 * @param {Scope} parent - possibly parent scope
 */
function Scope(parent = null, initial) {
  const scope = initial || {};

  const instance = {
    lookup,
    add,
    hasFunction,
    getFunction,
    childScope,
    scope,
    parent,
    raw() {
      return valueObject(scope);
    },
  };

  function lookup(prop) {
    if (scope[prop] != null) {
      return scope[prop];
    }

    return (parent == null) ? null : instance.parent.lookup(prop);
  }

  function add(prop, value) {
    scope[prop] = value;
  }

  function childScope() {
    return new Scope(instance);
  }

  function hasFunction(name) {
    const lookedUp = lookup(name);

    return lookedUp != null && typeof lookedUp.func === 'function';
  }

  function getFunction(name) {
    if (hasFunction(name)) {
      return lookup(name);
    }

    throw Error(`Could not find function: ${name}`);
  }

  return instance;
}

module.exports = (initial) => new Scope(null, initial);
