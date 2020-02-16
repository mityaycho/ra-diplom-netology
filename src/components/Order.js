import React, { Component } from 'react';
import { getCart, getItem } from './fetch/gettingRequests';
import fetchData from './fetch/fetchData';
import SitePath from './SitePath';
import OrderDone from './OrderDone';
import OrderForm from './OrderForm';
import changeCart from './fetch/changeCart';

export default class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: null,
            orderDone: false,
        };
        this.order = {};
        this.postOrder = this.postOrder.bind(this);
        this.getTotalPrice = this.getTotalPrice.bind(this);
        this.increaseCounter = this.increaseCounter.bind(this);
        this.deсreaseCounter = this.deсreaseCounter.bind(this);
    }

    componentDidMount() {
        getCart().then(res => {
            if (res) {
                this.getCartItems(res.data.products);
            } else {
                this.setState({ cart: null });
            }
        });
    }

    componentDidUpdate(p, s) {
        if (
            JSON.stringify(s) === JSON.stringify(this.state) &&
            this.state.cart
        ) {
            getCart().then(res => {
                if (res) {
                    this.getCartItems(res.data.products);
                } else {
                    this.setState({ cart: null });
                }
            });
        }
    }

    getCartItems(cart) {
        if (cart) {
            const items = [];
            cart.forEach(item => items.push(getItem(item.id)));
            Promise.all(items).then(values => {
                for (let i = 0; i < cart.length; i += 1) {
                    cart[i].item = values[i].data;
                }
                this.setState({ cart });
            });
        }
    }

    getTotalPrice() {
        let totalPrice = 0;
        this.state.cart.forEach(
            item => (totalPrice += item.item.price * item.amount)
        );
        return totalPrice;
    }

    isValidElement(element) {
        return element.name && element.value;
    }

    formToObj(elements) {
        return [].reduce.call(
            elements,
            (data, element) => {
                if (this.isValidElement(element)) {
                    data[element.name] = element.value;
                }
                return data;
            },
            {}
        );
    }

    increaseCounter(i) {
        const a = this.state.cart;
        a[i].amount += 1;
        changeCart(a[i].id, a[i].size, a[i].amount).then(res => {
            a[i].amount = res.data.amount;
            this.setState({ cart: a });
        });
    }

    deсreaseCounter(i) {
        const a = this.state.cart;
        if (a[i].amount === 1) return;
        a[i].amount -= 1;
        changeCart(a[i].id, a[i].size, a[i].amount).then(res => {
            a[i].amount = res.data.amount;
            this.setState({ cart: a });
        });
    }

    postOrder(e) {
        e.preventDefault();
        const obj = this.formToObj(e.currentTarget.elements);
        obj.paymentType = e.currentTarget.paymentType.value;
        obj.cart = localStorage.getItem('cartId');
        fetchData('order', 'POST', obj).then(res => {
            this.order = res.data;
            this.setState({ orderDone: true });
        });
    }

    render() {
        const { cart, orderDone } = this.state;
        if (!cart) return null;
        return (
            <div className="wrapper order-wrapper">
                <SitePath
                    title="Оформление заказа"
                    url="/Order/"
                    category="Заказ"
                />
                {orderDone ? (
                    <OrderDone
                        order={this.order}
                        getTotalPrice={this.getTotalPrice}
                    />
                ) : (
                    <OrderForm
                        postOrder={this.postOrder}
                        cart={cart}
                        getTotalPrice={this.getTotalPrice}
                        increaseCounter={this.increaseCounter}
                        deсreaseCounter={this.deсreaseCounter}
                    />
                )}
            </div>
        );
    }
}
