'use strict';

const daggy = require('daggy');
const {constant} = require('fantasy-combinators');
const {extract, extend, map} = require('fantasy-land');

const Store = daggy.tagged('set', 'get');

// Methods
Store.prototype.extract = function() {
    return this.set(this.get());
};
Store.prototype.extend = function(f) {
    return Store(
        (k) => f(Store(this.set, () => k)),
        this.get
    );
};

// Derived
Store.prototype.map = function(f) {
    return this.extend((c) => f(this.get()));
};

Store.prototype.over = function(f) {
    return this.set(f(this.get()));
};

module.exports = Store;
