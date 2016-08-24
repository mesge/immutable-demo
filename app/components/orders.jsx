import React, { Component, PropTypes } from 'react';
import OrderActions from '../actions/orderActions';
import OrderStore from '../stores/orderStore';

class OrdersApp extends Component {
    constructor () {
        super()
        this._onChange = this._onChange.bind(this);
        this.state = {
            orders: OrderStore.get(),
            confirm: []
        }
    }

    componentDidMount () {
        OrderStore.addChangeListener( this._onChange );
        OrderActions.getFromAPI();
    }

    componentWillUnmount () {
        OrderStore.removeChangeListener( this._onChange );
    }

    handleAdd (orderIndex, componentIndex, e) {
        e.preventDefault();
        OrderActions.increase(orderIndex, componentIndex)
    }

    handleSubtract (orderIndex, componentIndex, e) {
        e.preventDefault();
        OrderActions.decrease(orderIndex, componentIndex)
    }

    handleSubmit (e) {
        e.preventDefault();
        this.setState({
            confirm: OrderStore.getQuantities()
        });
    }

    clearConfirmation () {
        this.setState({
            confirm: []
        })
    }

    renderConfirm () {
        return(
            <div>
                <h1>Confirm</h1>
                <ul>
                    {this.state.confirm.map((item, k) => {
                        return <li key={k}>{item.name} &times; {item.ordered}</li>
                    })}
                </ul>
                <button onClick={ this.clearConfirmation.bind(this) } type="button">Cancel</button>
                <button>Confirm</button>
            </div>
        )
    }

    renderOrderForm () {
        return(
            <form onSubmit={ this.handleSubmit.bind(this) }>
                <h1>Orders</h1>
                <ol>
                    {this.state.orders.map( (order, k) => {
                        return(
                            <Order
                                onAdd={ this.handleAdd.bind(this, k) } 
                                onSubtract={ this.handleSubtract.bind(this, k) } 
                                order={ order } key={k} 
                            />
                        ) 
                    })}
                </ol>
                <button type="submit">Submit</button>
                { this.state.confirm.length > 0 && this.renderConfirm.bind(this) }
            </form>
        )
    }

    render () {
        return(
            <div>
                { this.state.confirm.length > 0 && this.renderConfirm() }
                { this.state.confirm.length == 0 && this.renderOrderForm() }
            </div>
        )
    }

    _onChange () {
        this.setState({
            orders: OrderStore.get()
        })
    }
}

let Order = (props) => {
    return (
        <li>
            { props.order.name }
            <ul>
                {props.order.components.map(function (component, k) {
                    return(
                        <li key={k}>
                            { component.ordered } &times; { component.name }
                            &nbsp;
                            &nbsp;
                            <button type="button" onClick={ props.onAdd.bind(this, k) }>+</button>
                            <button type="button" onClick={ props.onSubtract.bind(this, k) }>-</button>
                        </li>
                    )
                })}
            </ul>
        </li>
    )
}

export default OrdersApp;
