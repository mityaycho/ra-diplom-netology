import React, { Component } from 'react';
import ItemCard from './ItemCard';
import shortId from 'shortid';

export default class CardItem extends Component {
    render() {
        const { products, favorite } = this.props;
        if (!products) {
            return null;
        }
        return (
            <section
                className={`product-catalogue__item-list ${
                    favorite ? 'product-catalogue__item-list_favorite' : ''
                }`}
            >
                {products.map(item => (
                    <ItemCard
                        {...item}
                        key={shortId.generate()}
                        products={this.props.products}
                        favorite
                        updateFavorite={this.props.updateFavorite}
                    />
                ))}
            </section>
        );
    }
}
