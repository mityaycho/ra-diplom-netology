import React, { Component } from 'react';
import { getFavorite, setFavorite } from '../js/script';

export default class ProductInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 1,
            size: null,
        };
    }

    toggleFavorite(event, id) {
        event.preventDefault();
        event.currentTarget.children[0].classList.toggle('chosen');
        event.currentTarget.children[1].textContent =
            event.currentTarget.children[1].textContent === 'В избранном'
                ? 'В избранное'
                : 'В избранном';
        setFavorite(id, [this.props.card]);
    }

    componentWillUpdate(nextProps) {
        if (nextProps.card.id !== this.props.card.id) {
            this.setState({ size: null });
        }
    }

    increaseCounter() {
        this.setState({ counter: this.state.counter + 1 });
    }

    deсreaseCounter() {
        if (this.state.counter === 1) {
            return;
        }
        this.setState({ counter: this.state.counter - 1 });
    }

    changeSize(size) {
        this.setState({ size: size });
    }

    moneyFormat(n) {
        return parseFloat(n)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+\.)/g, '$1 ')
            .replace('.', ',');
    }

    render() {
        const { card } = this.props;
        return (
            <div className="main-screen__product-info">
                <div className="product-info-title">
                    <h2>{card.title}</h2>
                    <div className="in-stock">
                        {!card.sizes[0] ? 'Нет в наличии' : 'В наличии'}
                    </div>
                </div>
                <div className="product-features">
                    <table className="features-table">
                        <tbody>
                            <tr>
                                <td className="left-col">Артикул:</td>
                                <td className="right-col">{card.sku}</td>
                            </tr>
                            <tr>
                                <td className="left-col">Производитель:</td>
                                <td className="right-col">
                                    <a>
                                        <span className="producer">
                                            {card.brand}
                                        </span>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td className="left-col">Цвет:</td>
                                <td className="right-col">{card.color}</td>
                            </tr>
                            <tr>
                                <td className="left-col">Материалы:</td>
                                <td className="right-col">{card.material}</td>
                            </tr>
                            <tr>
                                <td className="left-col">Сезон:</td>
                                <td className="right-col">{card.season}</td>
                            </tr>
                            <tr>
                                <td className="left-col">Повод:</td>
                                <td className="right-col">{card.reason}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="size">Размер</p>
                <ul className="sizes">
                    {card.sizes.map((size, i) => {
                        const className =
                            size.size === this.state.size ? 'active' : '';
                        return size.available ? (
                            <li
                                key={i}
                                className={className}
                                onClick={() => this.changeSize(size.size)}
                            >
                                <a>{size.size}</a>
                            </li>
                        ) : null;
                    })}
                </ul>
                <div className="size-wrapper">
                    <a>
                        <span className="size-rule" />
                        <p className="size-table">Таблица размеров</p>
                    </a>
                </div>
                <a
                    className="in-favourites-wrapper"
                    onClick={event => this.toggleFavorite(event, card.id)}
                >
                    <div
                        className={`favourite ${
                            getFavorite(card.id) ? ' chosen' : ''
                        }`}
                    />
                    <p className="in-favourites">
                        {getFavorite(card.id) ? 'В избранном' : 'В избранное'}
                    </p>
                </a>
                <div className="basket-item__quantity">
                    <div
                        className="basket-item__quantity-change basket-item-list__quantity-change_minus"
                        onClick={this.deсreaseCounter.bind(this)}
                    >
                        -
                    </div>
                    {this.state.counter}
                    <div
                        className="basket-item__quantity-change basket-item-list__quantity-change_plus"
                        onClick={this.increaseCounter.bind(this)}
                    >
                        +
                    </div>
                </div>
                <div className="price">{this.moneyFormat(card.price)} ₽</div>
                <button
                    className={`in-basket in-basket-click ${
                        !!this.state.size ? '' : ' in-basket_disabled'
                    }`}
                    onClick={() =>
                        this.props.toCart(this.state.counter, this.state.size)
                    }
                >
                    {!!this.state.size ? 'В корзину' : 'ВЫБЕРЕТЕ РАЗМЕР'}
                </button>
            </div>
        );
    }
}
