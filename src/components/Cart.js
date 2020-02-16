import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCart, getItem } from './fetch/gettingRequests';
import changeCart from './fetch/changeCart';

class Cart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cart: [],
		};
	}

	componentDidMount() {
		if (!localStorage.getItem('cartId')) {
			return null;
		}
		getCart().then(response => this.getCartItems(response.data.products));
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			JSON.stringify(prevState) !== JSON.stringify(this.state) ||
			JSON.stringify(prevProps) !== JSON.stringify(this.props)
		) {
			if (!localStorage.getItem('cartId')) {
				this.props.update();
				return null;
			}
			getCart().then(res => this.getCartItems(res.data.products));
		}
	}

	getCartItems(cart) {
		const items = [];
		cart.forEach(item => items.push(getItem(item.id)));
		Promise.all(items).then(values => {
			for (let i = 0; i < cart.length; i++) {
				cart[i].images = values[i].data.images;
				cart[i].title = values[i].data.title;
				cart[i].brand = values[i].data.brand;
				cart[i].price = values[i].data.price;
			}
			this.setState({ cart });
			this.props.changeCart(
				localStorage.getItem('cartId') ? cart.length : 0
			);
		});
	}

	removeItem(item) {
		if (this.state.cart.length === 1) {
			changeCart(item.id, item.size, 0).then(
				localStorage.removeItem('cartId')
			);
			this.setState({ cart: [] });
		} else {
			changeCart(item.id, item.size, 0).then(res =>
				this.getCartItems(res.data.products)
			);
		}
	}

	render() {
		const { cart } = this.state;
		return (
			<div className="hidden-panel__basket basket-dropped">
				<div className="basket-dropped__title">В вашей корзине:</div>
				<div className="basket-dropped__product-list product-list">
					{localStorage.getItem('cartId') ? (
						cart.map((item, i) => {
							return (
								<div className="product-list__item" key={i}>
									<a className="product-list__pic">
										<img
											src={item.images[0]}
											alt={item.title}
										/>
									</a>
									<Link
										to={`/item/${item.id}`}
										className="product-list__product"
									>
										{`${item.title}, ${item.brand}, ${
											item.amount
											} шт.`}
									</Link>
									<div className="product-list__fill" />
									<div className="product-list__price">
										{item.price * item.amount}
										<i
											className="fa fa-rub"
											aria-hidden="true"
										/>
									</div>
									<div className="product-list__delete">
										<i
											className="fa fa-times"
											aria-hidden="true"
											onClick={() =>
												this.removeItem(item)
											}
										/>
									</div>
								</div>
							);
						})
					) : (
							<div className="product-list__item">
								<span className="empty-cart">
									В корзине пока ничего нет. Не знаете, с чего
									начать? Посмотрите наши новинки!
                            </span>
							</div>
						)}
				</div>
				{localStorage.getItem('cartId') ? (
					<Link
						className="basket-dropped__order-button"
						to="/order/"
						onClick={this.props.update}
					>
						Оформить заказ
                    </Link>
				) : null}
			</div>
		);
	}
}

export default Cart;
