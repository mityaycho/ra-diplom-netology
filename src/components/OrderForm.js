import React from 'react';
import { Link } from 'react-router-dom';

const OrderForm = props => {
    const { cart } = props;
    return (
        <section className="order-process">
            <h2 className="order-process__title">Оформление заказа</h2>
            <div className="order-process__basket order-basket">
                <div className="order-basket__title">в вашей корзине:</div>
                <div className="order-basket__item-list">
                    {cart.map((cartItem, i) => {
                        return (
                            <div className="basket-item" key={i}>
                                <div className="basket-item__pic">
                                    <img
                                        src={cartItem.item.images[0]}
                                        alt="product_1"
                                    />
                                </div>
                                <div className="basket-item__product">
                                    <div className="basket-item__product-name">
                                        <Link to={'/item/' + cartItem.id}>
                                            {cartItem.item.title}
                                        </Link>
                                    </div>
                                    <div className="basket-item__product-features">
                                        <div className="basket-item__size">
                                            Размер: <span>{cartItem.size}</span>
                                        </div>
                                        <div className="basket-item__producer">
                                            Производитель:{' '}
                                            <span>{cartItem.item.brand}</span>
                                        </div>
                                        <div className="basket-item__color">
                                            Цвет:{' '}
                                            <span>{cartItem.item.color}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="basket-item__quantity">
                                    <div
                                        className="basket-item__quantity-change basket-item-list__quantity-change_minus"
                                        onClick={() => props.deсreaseCounter(i)}
                                    >
                                        -
                                    </div>
                                    {cartItem.amount}
                                    <div
                                        className="basket-item__quantity-change basket-item-list__quantity-change_plus"
                                        onClick={() => props.increaseCounter(i)}
                                    >
                                        +
                                    </div>
                                </div>
                                <div className="basket-item__price">
                                    {cartItem.item.price}{' '}
                                    <i
                                        className="fa fa-rub"
                                        aria-hidden="true"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="order-basket__summ">
                    Итого:{' '}
                    <span>
                        {props.getTotalPrice()}{' '}
                        <i className="fa fa-rub" aria-hidden="true" />
                    </span>
                </div>
            </div>
            <div className="order-process__confirmed">
                <form onSubmit={props.postOrder}>
                    <div className="order-process__delivery">
                        <h3 className="h3">кому и куда доставить?</h3>
                        <div className="order-process__delivery-form">
                            <label className="order-process__delivery-label">
                                <div className="order-process__delivery-text">
                                    Имя
                                </div>
                                <input
                                    className="order-process__delivery-input"
                                    type="text"
                                    name="name"
                                    placeholder="Представьтесь, пожалуйста"
                                    required
                                />
                            </label>
                            <label className="order-process__delivery-label">
                                <div className="order-process__delivery-text">
                                    Телефон
                                </div>
                                <input
                                    className="order-process__delivery-input"
                                    type="tel"
                                    name="phone"
                                    placeholder="Номер в любом формате"
                                    required
                                />
                            </label>
                            <label className="order-process__delivery-label">
                                <div className="order-process__delivery-text">
                                    Адрес
                                </div>
                                <input
                                    className="order-process__delivery-input order-process__delivery-input_adress"
                                    type="text"
                                    name="address"
                                    placeholder="Ваша покупка будет доставлена по этому адресу"
                                    required
                                />
                            </label>
                        </div>
                        <p>
                            Все поля обязательны для заполнения. Наш оператор
                            свяжется с вами для уточнения деталей заказа.
                        </p>
                    </div>
                    <div className="order-process__paid">
                        <h3 className="h3">
                            хотите оплатить онлайн или курьеру при получении?
                        </h3>
                        <div className="order-process__paid-form">
                            <label className="order-process__paid-label">
                                <input
                                    className="order-process__paid-radio"
                                    type="radio"
                                    name="paymentType"
                                    value="onlineCard"
                                    required
                                />
                                <span className="order-process__paid-text">
                                    Картой онлайн
                                </span>
                            </label>
                            <label className="order-process__paid-label">
                                <input
                                    className="order-process__paid-radio"
                                    type="radio"
                                    name="paymentType"
                                    value="offlineCard"
                                />
                                <span className="order-process__paid-text">
                                    Картой курьеру
                                </span>
                            </label>
                            <label className="order-process__paid-label">
                                <input
                                    className="order-process__paid-radio"
                                    type="radio"
                                    name="paymentType"
                                    value="offlineCash"
                                />
                                <span className="order-process__paid-text">
                                    Наличными курьеру
                                </span>
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="order-process__form-submit order-process__form-submit_click"
                    >
                        Подтвердить заказ
                    </button>
                </form>
            </div>
        </section>
    );
};

export default OrderForm;
