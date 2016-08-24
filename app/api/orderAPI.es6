import AppDispatcher from '../dispatcher/appDispatcher';
import OrderConstants from '../constants/orderConstants';

const OrderAPI = (function () {

    function getAll () {

        let orders = [
            { 
                name: "Bottle", 
                components: [
                    { name: "Cap", ordered: 1 },
                    { name: "Handle", ordered: 0 },
                    { name: "Label", ordered: 10 }
                ] 
            },
            {
                name: "Box",
                components: [
                    { name: "Lid", ordered: 3 },
                    { name: "Body", ordered: 3 }
                ]
            },
            {
                name: "Chair",
                components: [
                    { name: "Wheel", ordered: 8 },
                    { name: "Seat", ordered: 2 },
                    { name: "Backrest", ordered: 2 },
                    { name: "Lever", ordered: 2 },
                    { name: "Base", ordered: 2 },
                    { name: "Axle", ordered: 2 }
                ]
            }
        ];

        return Promise.resolve(orders)
            .then( (res) => {
                AppDispatcher.handleViewAction({
                    actionType: OrderConstants.ORDER_SET,
                    orders: res
                })
            });

    }
    
    return {
        getAll: getAll 
    }

})();

export default OrderAPI;
