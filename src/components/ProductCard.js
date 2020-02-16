import React, { Component } from 'react';
import SitePath from './SitePath';
import ProductInfo from './ProductInfo';
import changeCart from './fetch/changeCart';
import SimilarProducts from './SimilarProducts';
import getParams from './fetch/doubleRequest';
import { setLooked } from './looked';
import OverlookedSlider from './OverlookedSlider';

export default class ProductCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: null,
            currentImage: 0,
            currentItem: this.props.match.params.id,
            categories: [],
        };
        this.toCart = this.toCart.bind(this);
    }

    toCart(counter, size) {
        window.scrollTo(0, 0);
        changeCart(this.state.card.id, size, counter)
            .then(this.props.update)
            .catch(err => console.log(err));
    }

    componentDidMount() {
        getParams(['item', this.state.currentItem], 'categories')
            .then(res =>
                this.setState({
                    card: res.item.data,
                    categories: res.categories.data,
                })
            )
            .catch(e => console.log(e));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.state.currentItem) {
            this.setState({ currentItem: nextProps.match.params.id });
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.state.currentItem) {
            getParams(['item', this.state.currentItem], 'categories')
                .then(res =>
                    this.setState({
                        card: res.item.data,
                        categories: res.categories.data,
                    })
                )
                .catch(e => console.log(e));
        }
    }

    changeImage(index) {
        const { card } = this.state;
        if (index === card.images.length) index = 0;
        if (index < 0) index = card.images.length - 1;
        this.setState({ currentImage: index });
    }

    render() {
        const { card, currentImage } = this.state;
        if (!card) return null;
        setLooked(card.id, card);
        return (
            <div>
                <SitePath title={`${card.title}`} />
                <main className="product-card">
                    <section className="product-card-content">
                        <h2 className="section-name">{card.title}</h2>
                        <section className="product-card-content__main-screen">
                            <section className="main-screen__favourite-product-slider">
                                <div className="favourite-product-slider">
                                    <div
                                        className="favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up"
                                        onClick={() =>
                                            this.changeImage(currentImage - 1)
                                        }
                                    />
                                    {card.images.map((image, i) => (
                                        <div
                                            key={i}
                                            className={`favourite-product-slider__item favourite-product-slider__item-${i +
                                                1}`}
                                            style={{
                                                backgroundImage: `url(${image})`,
                                                backgroundSize: 'contain',
                                                backgroundPosition: '50%',
                                            }}
                                            onClick={() => this.changeImage(i)}
                                        >
                                            <a />
                                        </div>
                                    ))}
                                    <div
                                        className="favourite-product-slider__arrow favourite-product-slider__arrow_down arrow-down"
                                        onClick={() =>
                                            this.changeImage(currentImage + 1)
                                        }
                                    />
                                </div>
                            </section>
                            <div className="main-screen__favourite-product-pic">
                                <a>
                                    <img
                                        src={card.images[currentImage]}
                                        alt={card.title}
                                    />
                                </a>
                                <a className="main-screen__favourite-product-pic__zoom" />
                            </div>
                            <ProductInfo card={card} toCart={this.toCart} />
                        </section>
                    </section>
                </main>
                <section className="product-card__overlooked-slider">
                    <h3>Вы смотрели:</h3>
                    <div className="overlooked-slider">
                        <OverlookedSlider />
                    </div>
                </section>
                <SimilarProducts product={card} />
            </div>
        );
    }
}
