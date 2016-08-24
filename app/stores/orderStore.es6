'use strict';

import AppDispatcher from '../dispatcher/appDispatcher';
import EventEmitter from 'events';
import OrderConstants from '../constants/orderConstants';
import Immutable from 'immutable';

var CHANGE_EVENT = 'order-change';
var _orders = Immutable.List();

function replace (orders) {
    _orders = Immutable.fromJS(orders);
}

function increase (orderIndex, componentIndex) {
    let keypath =  [orderIndex, 'components', componentIndex, 'ordered'];
    _orders = _orders.updateIn(keypath, (n) => { return n + 1 });
}

function decrease (orderIndex, componentIndex) {
    let keypath =  [orderIndex, 'components', componentIndex, 'ordered'];
    _orders = _orders.updateIn(keypath, (n) => { return n-1 >= 0 ? n - 1 : n });
}

var OrderStore = Object.assign({}, EventEmitter.prototype, {

    get: function () {
        return _orders.toJS();
    },

    getQuantities: function () {
        return _orders.toJS().reduce( (acc, order) => {
            return acc.concat(order.components.map((component) => { return component })) 
        }, []);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

});

AppDispatcher.register(function (action) {

    var orders;

    switch(action.actionType) {

        case OrderConstants.ORDER_SET:
 			orders = action.orders;
            replace(orders);
            OrderStore.emitChange();
            break;

        case OrderConstants.ORDER_INCREASE:
            increase(action.orderIndex, action.componentIndex)
            OrderStore.emitChange();
            break;

        case OrderConstants.ORDER_DECREASE:
            decrease(action.orderIndex, action.componentIndex)
            OrderStore.emitChange();
            break;

        default:
            // no op

    }

});

export default OrderStore;
