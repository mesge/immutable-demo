import AppDispatcher from '../dispatcher/appDispatcher';
import OrderConstants from '../constants/orderConstants';
import OrderAPI from '../api/orderAPI';

var OrderActions = {

    getFromAPI: function () {
        return OrderAPI.getAll(); 
    },

    set: function (counters) {
        AppDispatcher.handleViewAction({
            actionType: OrderConstants.ORDER_SET
        });
    },

    increase: function (orderIndex, componentIndex) {
        AppDispatcher.handleViewAction({
            actionType: OrderConstants.ORDER_INCREASE,
            orderIndex: orderIndex,
            componentIndex: componentIndex
        })
    },

    decrease: function (orderIndex, componentIndex) {
        AppDispatcher.handleViewAction({
            actionType: OrderConstants.ORDER_DECREASE,
            orderIndex: orderIndex,
            componentIndex: componentIndex
        })
    }

}

export default OrderActions;
