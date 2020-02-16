import React, { Component } from 'react';
import { getFavorite, setFavorite } from '../js/script';
import Link from 'react-router-dom/Link';
import { getItem } from './fetch/gettingRequests';

class ItemCard extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            availableSizes: [],
            currentImage: 0,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        getItem(this.props.id).then(res => {
            if (this._isMounted) {
                this.setState({availableSizes: res.data.sizes})

            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    toFavorite(event, id) {
        event.preventDefault();
        event.currentTarget.classList.toggle(
            'product-catalogue__product_favorite'
        );
        event.currentTarget.classList.toggle(
            'product-catalogue__product_favorite-chosen'
        );
        setFavorite(id, this.props.products);
        if (this.props.favorite) this.props.updateFavorite();
    }

    slidePhotoTo(arrow) {
        let { currentImage } = this.state;
        let nextSlide = currentImage + 1;
        let prevSlide = currentImage - 1;
        if (arrow) {
            if (currentImage + 1 === this.props.images.length) {
                nextSlide = 0;
            }
            this.setState({ currentImage: nextSlide });
        } else {
            if (currentImage === 0) {
                prevSlide = this.props.images.length - 1;
            }
            this.setState({ currentImage: prevSlide });
        }
    }

    handleArrowClick(event) {
        event.preventDefault();
        const onRight = event.target.classList.contains('arrow_right') ? 1 : 0;
        this.slidePhotoTo(onRight);
    }

    render() {
        const { brand, id, images, price, title, oldPrice } = this.props;
        const { currentImage, availableSizes } = this.state;
        const sizes = availableSizes.map((el, i) => el.size).join(', ');

        return (
            <Link
                to={`/item/${id}`}
                key={id}
                className="item-list__item-card item"
            >
                <div className="item-pic">
                    <img
                        className="item-pic-1"
                        src={images[currentImage]}
                        alt={title}
                    />
                    <div
                        className={`product-catalogue__product_favorite${
                            getFavorite(id) ? '-chosen' : ''
                        }`}
                        onClick={event => this.toFavorite(event, id)}
                    >
                        <p />
                    </div>
                    {oldPrice ? (
                        <div className="product-catalogue__product_discount">
                            <p>{`–${Math.floor(
                                (1 - price / oldPrice) * 100
                            )} %`}</p>
                        </div>
                    ) : null}
                    {images.length > 1 ? (
                        <div>
                            <div
                                className="arrow arrow_left"
                                onClick={event => this.handleArrowClick(event)}
                            />
                            <div
                                className="arrow arrow_right"
                                onClick={event => this.handleArrowClick(event)}
                            />
                        </div>
                    ) : null}
                </div>
                <div className="item-desc">
                    <h4 className="item-name">{title}</h4>
                    <p className="item-producer">
                        Производитель: <span className="producer">{brand}</span>
                    </p>
                    <p className="item-price">{price}</p>
                    <div className="sizes">
                        <p className="sizes__title">Размеры в наличии:</p>
                        <p className="sizes__avalible">{sizes}</p>
                    </div>
                </div>
            </Link>
        );
    }
}

export default ItemCard;
