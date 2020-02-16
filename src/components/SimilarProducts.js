import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../components/fetch/gettingRequests';

export default class SimilarProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            similarProducts: { data: [] },
            pages: 0,
            page: 1,
        };
    }

    togglePage(target) {
        const { page, pages } = this.state;
        if (target === 'next') {
            this.setState({ page: page + 1 > pages ? 1 : page + 1 });
        }
        if (target === 'prev') {
            this.setState({ page: page - 1 === 0 ? pages : page - 1 });
        }
    }

    getSimilarProducts(item) {
        getProducts(`?categoryId=${item.categoryId}&color=${item.color}`).then(
            res =>
                this.setState({
                    similarProducts: res,
                    pages: Math.ceil(res.data.length / 3),
                })
        );
    }

    componentWillUpdate(nextProps) {
        if (this.props.product.id !== nextProps.product.id) {
            this.getSimilarProducts(nextProps.product);
        }
    }

    componentDidMount() {
        const { product } = this.props;
        this.getSimilarProducts(product);
    }

    render() {
        const { similarProducts, page } = this.state;
        return (
            <section className="product-card__similar-products-slider">
                <h3>Похожие товары:</h3>
                <div className="similar-products-slider">
                    <div
                        className="similar-products-slider__arrow similar-products-slider__arrow_left arrow"
                        onClick={() => this.togglePage('prev')}
                    />
                    {similarProducts.data.map((product, index) => {
                        if (index < page * 3 && index >= page * 3 - 3) {
                            return (
                                <div
                                    className="similar-products-slider__item-list__item-card item"
                                    key={index}
                                >
                                    <div className="similar-products-slider__item">
                                        <Link to={'/item/' + product.id}>
                                            <img
                                                src={product.images[0]}
                                                className="similar-products-slider__item-pic"
                                                alt={product.title}
                                            />
                                        </Link>
                                    </div>
                                    <div className="similar-products-slider__item-desc">
                                        <h4 className="similar-products-slider__item-name">
                                            {product.title}
                                        </h4>
                                        <p className="similar-products-slider__item-producer">
                                            Производитель:{' '}
                                            <span className="producer">
                                                {product.brand}
                                            </span>
                                        </p>
                                        <p className="similar-products-slider__item-price">
                                            {product.price}
                                        </p>
                                    </div>
                                </div>
                            );
                        } else return null;
                    })}
                    <div
                        className="similar-products-slider__arrow similar-products-slider__arrow_right arrow"
                        onClick={() => this.togglePage('next')}
                    />
                </div>
            </section>
        );
    }
}
