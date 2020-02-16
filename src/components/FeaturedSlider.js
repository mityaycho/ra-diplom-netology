import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { setFavorite, getFavorite } from '../js/script';

export default class FeaturedSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            prev: 0,
            next: 2,
        };
    }

    componentWillReceiveProps(nextProps) {
        nextProps.featured[0].categoryId !== this.props.featured[0].categoryId
            ? this.setState({ current: 1, prev: 0, next: 2 })
            : null;
    }

    changeItems(point) {
        const lastItem = this.props.featured.length;
        let { current, prev, next } = this.state;
        if (point === 'next') {
            current += 1;
            prev += 1;
            next += 1;
        }
        if (point === 'prev') {
            current -= 1;
            prev -= 1;
            next -= 1;
        }
        if (current === lastItem) {
            current = 0;
        }
        if (current < 0) {
            current = lastItem - 1;
        }
        if (prev === lastItem) {
            prev = 0;
        }
        if (prev < 0) {
            prev = lastItem - 1;
        }
        if (next === lastItem) {
            next = 0;
        }
        if (next < 0) {
            next = lastItem - 1;
        }
        this.props.setProductInfo(current);
        this.setState({ current, prev, next });
    }

    nextItem() {
        this.changeItems('next');
    }

    prevItem() {
        this.changeItems('prev');
    }

    toggleFavorite(event, id) {
        event.preventDefault();
        event.currentTarget.classList.toggle('new-deals__product_favorite');
        event.currentTarget.classList.toggle(
            'new-deals__product_favorite-chosen'
        );
        setFavorite(id, this.props.featured);
        this.setState({});
    }

    render() {
        const { current, next, prev } = this.state;
        const { featured } = this.props;
        return (
            <div className="new-deals__slider">
                <div
                    className="new-deals__arrow new-deals__arrow_left arrow"
                    onClick={() => this.prevItem()}
                />
                <div
                    className="new-deals__product new-deals__product_first"
                    style={{
                        backgroundImage: `url(${featured[prev].images[0]})`,
                    }}
                >
                    <Link to={`/item/${featured[prev].id}`} />
                </div>

                <div
                    className="new-deals__product new-deals__product_active"
                    style={{
                        backgroundImage: `url(${featured[current].images[0]})`,
                    }}
                >
                    <Link to={`/item/${featured[current].id}`} />
                    <div
                        className={`new-deals__product_favorite${
                            getFavorite(featured[current].id) ? '-chosen' : ''
                        }`}
                        onClick={event =>
                            this.toggleFavorite(event, featured[current].id)
                        }
                    />
                </div>
                <div
                    className="new-deals__product new-deals__product_last"
                    style={{
                        backgroundImage: `url(${featured[next].images[0]})`,
                    }}
                >
                    <Link to={`/item/${featured[next].id}`} />
                </div>
                <div
                    className="new-deals__arrow new-deals__arrow_right arrow"
                    onClick={() => this.nextItem()}
                />
            </div>
        );
    }
}
