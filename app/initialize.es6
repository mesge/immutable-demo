import ReactDOM from 'react-dom';
import React from 'react';
import OrdersApp from './components/orders';

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
        React.createElement(OrdersApp),
        document.getElementById('orders_app')
    );
});
