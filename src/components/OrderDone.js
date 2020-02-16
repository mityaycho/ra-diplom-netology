import React from 'react';
import { Link } from 'react-router-dom';

const getPaymentType = type => {
    let a = '';
    switch (type) {
        case 'onlineCard':
            a = 'Картой онлайн';
            break;
        case 'offlineCard':
            a = 'Картой курьеру';
            break;
        case 'offlineCash':
            a = 'Наличными курьеру';
            break;
        default:
            a = 'Не выбрано';
    }
    return a;
};

const OrderDone = props => {
    localStorage.removeItem('cartId');
    const { order } = props;
    const paymentType = getPaymentType(order.info.paymentType);
    return (
        <section className="order-done">
            <h2 className="order-done__title order-process__title">
                Заказ принят, спасибо!
            </h2>
            <div className="order-done__information order-info">
                <div className="order-info__item order-info__item_summ">
                    <h3>Сумма заказа:</h3>
                    <p>
                        {props.getTotalPrice()}{' '}
                        <i className="fa fa-rub" aria-hidden="true" />
                    </p>
                </div>
                <div className="order-info__item order-info__item_pay-form">
                    <h3>Способ оплаты:</h3>
                    <p>{paymentType}</p>
                </div>
                <div className="order-info__item order-info__item_customer-name">
                    <h3>Имя клиента:</h3>
                    <p>{order.info.name}</p>
                </div>
                <div className="order-info__item order-info__item_adress">
                    <h3>Адрес доставки:</h3>
                    <p>{order.info.address}</p>
                </div>
                <div className="order-info__item order-info__item_phone">
                    <h3>Телефон:</h3>
                    <p>{order.info.phone}</p>
                </div>
            </div>
            <p className="order-done__notice">
                Данные о заказе отправлены на адрес{' '}
                <span>notbosaanymore@gmail.com. </span>
            </p>
            <Link className="order-done__continue" to="/catalogue/">
                продолжить покупки
            </Link>
        </section>
    );
};

export default OrderDone;
