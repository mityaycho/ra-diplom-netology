import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
    headerMainSearchVisibility,
    headerHiddenPanelProfileVisibility,
    headerHiddenPanelBasketVisibility,
} from '../js/script';
import getParams from './fetch/doubleRequest';
import logo from '../img/header-logo.png';
import Link from 'react-router-dom/Link';
import Cart from './Cart';
import { getCart } from './fetch/gettingRequests';

class HeaderMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            filters: null,
            searchString: '',
            cartItems: 0,
            cart: [],
        };
        this.changeCart = this.changeCart.bind(this);
        this.searchAction = this.searchAction.bind(this);
        this.icon = '';
    }

    componentDidMount() {
        getParams('categories', 'filters')
            .then(res =>
                this.setState({
                    categories: res.categories.data,
                    filters: res.filters.data,
                })
            )
            .catch(err => console.log(err));
    }

    componentWillReceiveProps() {
        localStorage.getItem('cartId')
            ? getCart().then(res => {
                  this.setState({
                      cartItems: res.data.products.length,
                      cart: res.data.products,
                  });
              })
            : this.setState({ cartItems: 0 });
    }

    searchAction(event) {
        event.preventDefault();
        this.setState({ searchString: event.target.elements[0].value });
    }

    redirectToSearchItem() {
        const { searchString } = this.state;
        return searchString ? (
            <Redirect to={`/catalogue/?search=${searchString}`} />
        ) : null;
    }

    changeCart(cart) {
        this.setState({ cartItems: cart });
    }

    render() {
        const { cartItems, cart } = this.state;
        return (
            <div className="header-main">
                <div className="header-main__wrapper wrapper">
                    <div className="header-main__phone">
                        <a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
                        <p>Ежедневно: с 09-00 до 21-00</p>
                    </div>
                    <div className="header-main__logo">
                        <Link to="/">
                            <h1>
                                <img
                                    src={logo}
                                    ref={node => (this.logo = node)}
                                    alt="logotype"
                                />
                            </h1>
                        </Link>
                        <p>Обувь и аксессуары для всей семьи</p>
                    </div>
                    <div className="header-main__profile">
                        <div className="header-main__pics">
                            <div
                                className="header-main__pic header-main__pic_search"
                                onClick={headerMainSearchVisibility}
                            />
                            <div className="header-main__pic_border" />
                            <div
                                className="header-main__pic header-main__pic_profile"
                                onClick={headerHiddenPanelProfileVisibility}
                            >
                                <div className="header-main__pic_profile_menu" />
                            </div>
                            <div className="header-main__pic_border" />
                            <div
                                className="header-main__pic header-main__pic_basket"
                                onClick={headerHiddenPanelBasketVisibility}
                            >
                                <div
                                    className="header-main__pic_basket_full"
                                    style={
                                        cartItems
                                            ? { display: 'block' }
                                            : { display: 'none' }
                                    }
                                >
                                    {cartItems}
                                </div>
                                <div className="header-main__pic_basket_menu" />
                            </div>
                        </div>
                        <form
                            className="header-main__search"
                            onSubmit={this.searchAction}
                        >
                            {this.redirectToSearchItem()}
                            <input placeholder="Поиск" />
                            <i className="fa fa-search" aria-hidden="true" />
                        </form>
                    </div>
                </div>
                <div className="header-main__hidden-panel hidden-panel">
                    <div className="hidden-panel__profile">
                        <a>Личный кабинет</a>
                        <Link
                            onClick={headerHiddenPanelProfileVisibility}
                            to="/favorite"
                        >
                            <i className="fa fa-heart-o" aria-hidden="true" />
                            Избранное
                        </Link>
                        <a>Выйти</a>
                    </div>
                    <Cart
                        changeCart={this.changeCart}
                        shouldUpdate={this.state.cartItems}
                        update={this.props.update}
                        cart={cart}
                    />
                </div>
            </div>
        );
    }
}

export default HeaderMain;
