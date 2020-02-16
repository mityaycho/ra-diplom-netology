import React, { Component } from 'react';
import { getFilters } from './fetch/gettingRequests';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableFilters: null,
        };
        this.colors = {
            beige: 'Бежевый',
            white: 'Белый',
            purple: 'Фиолетовый',
            black: 'Черный',
            red: 'Красный',
            transparent: 'Прозрачный',
            pink: 'Розовый',
            darkgreen: 'Темно-салатовый',
            orange: 'Оранжевый',
            gray: 'Серый',
            darkblue: 'Синий',
            metalic: 'Металлик',
            colorful: 'Разноцветные',
            silver: 'Серебряный',
            blackandwhite: 'Черно-белый',
            bardo: 'Бардо',
            brown: 'Коричневый',
        };
    }

    componentDidMount() {
        getFilters().then(res => this.setState({ availableFilters: res.data }));
    }

    changePrice(event) {
        if (event.currentTarget.type === 'number') {
            if (
                Number(this.maxPriceLabel.value) >
                Number(this.minPriceLabel.value)
            ) {
                this.maxPrice.value = this.maxPriceLabel.value;
                this.minPrice.value = this.minPriceLabel.value;
            }
            if (
                Number(this.maxPriceLabel.value) <
                    Number(this.minPriceLabel.value) &&
                event.currentTarget === this.maxPriceLabel
            ) {
                this.maxPrice.value = this.maxPriceLabel.value;
                this.minPrice.value = this.minPriceLabel.value = this.maxPriceLabel.value;
            }
            if (
                Number(this.maxPriceLabel.value) <
                    Number(this.minPriceLabel.value) &&
                event.currentTarget === this.minPriceLabel
            ) {
                this.maxPrice.value = this.maxPriceLabel.value = this.minPriceLabel.value;
                this.minPrice.value = this.minPriceLabel.value;
            }
        } else {
            this.maxPriceLabel.value = this.maxPrice.value;
            this.minPriceLabel.value = this.minPrice.value;
            if (event.currentTarget === this.maxPrice) {
                if (Number(this.maxPrice.value) < Number(this.minPrice.value)) {
                    this.minPrice.value = this.maxPrice.value;
                }
            } else if (
                Number(this.minPrice.value) > Number(this.maxPrice.value)
            ) {
                this.maxPrice.value = this.minPrice.value;
            }
        }
        this.coloredLine.style.width = `${((this.maxPrice.value -
            this.minPrice.value) /
            60000) *
            100}%`;
        this.coloredLine.style.left = `${(this.minPrice.value / 60000) * 100}%`;
    }

    render() {
        const { filterSelect, filters } = this.props;
        const { availableFilters } = this.state;
        const colorsArr = [];
        if (!availableFilters) {
            return null;
        }
        Object.keys(this.colors).forEach(key => {
            if (
                availableFilters.color.find(
                    color => this.colors[key] === color
                ) + 1
            ) {
                const className =
                    filters.color === this.colors[key] ? 'active' : '';
                colorsArr.push(
                    <li key={key}>
                        <a
                            className={className}
                            onClick={() =>
                                filterSelect({ color: this.colors[key] })
                            }
                        >
                            <div className={`color ${key}`} />
                            <span className="color-name">
                                {this.colors[key]}
                            </span>
                        </a>
                    </li>
                );
            }
        });
        return (
            <section className="sidebar">
                <section className="sidebar__division">
                    <div className="sidebar__catalogue-list">
                        <div className="sidebar__division-title">
                            <h3>Каталог</h3>
                            <div className="opener-down" />
                        </div>
                        <ul>
                            {availableFilters.type.map((cat, i) => {
                                const className =
                                    filters.type === cat ? 'active' : '';
                                return (
                                    <li key={i}>
                                        <a
                                            className={className}
                                            onClick={() =>
                                                filterSelect({ type: cat })
                                            }
                                        >
                                            {cat}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>
                <div className="separator-150 separator-150-1" />
                <section className="sidebar__division">
                    <div className="sidebar__price">
                        <div className="sidebar__division-title">
                            <h3>Цена </h3>
                            <div className="opener-down" />
                        </div>
                        <div className="price-slider">
                            <div className="circle-container">
                                <input
                                    className="range-1"
                                    type="range"
                                    min="0"
                                    max="60000"
                                    defaultValue="0"
                                    step="1"
                                    ref={input => (this.minPrice = input)}
                                    onInput={event => this.changePrice(event)}
                                    onMouseUp={() =>
                                        filterSelect({
                                            minPrice: this.minPrice.value,
                                        })
                                    }
                                />
                                <input
                                    className="range-2"
                                    type="range"
                                    min="0"
                                    max="60000"
                                    defaultValue="60000"
                                    step="1"
                                    ref={input => (this.maxPrice = input)}
                                    onInput={event => this.changePrice(event)}
                                    onMouseUp={() =>
                                        filterSelect({
                                            maxPrice: this.maxPrice.value,
                                        })
                                    }
                                />
                                <div className="line-white" />
                                <div
                                    className="line-colored"
                                    ref={line => (this.coloredLine = line)}
                                />
                            </div>
                            <div className="counter">
                                <input
                                    type="number"
                                    className="input-1"
                                    defaultValue="0"
                                    ref={input => (this.minPriceLabel = input)}
                                    onBlur={event => this.changePrice(event)}
                                    onChange={e =>
                                        (e.currentTarget.value = Number(
                                            e.currentTarget.value
                                        ))
                                    }
                                />
                                <div className="input-separator" />
                                <input
                                    type="number"
                                    className="input-2"
                                    defaultValue="60000"
                                    ref={input => (this.maxPriceLabel = input)}
                                    onBlur={event => this.changePrice(event)}
                                    onChange={event =>
                                        (event.currentTarget.value = Number(
                                            event.currentTarget.value
                                        ))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <div className="separator-150 separator-150-2" />
                <section className="sidebar__division">
                    <div className="sidebar__color">
                        <div className="sidebar__division-title">
                            <h3>Цвет</h3>
                            <div className="opener-down" />
                        </div>
                        <ul>{colorsArr}</ul>
                    </div>
                </section>
                <div className="separator-150 separator-150-3" />
                <section className="sidebar__division">
                    <div className="sidebar__size">
                        <div className="sidebar__division-title">
                            <h3>Размер</h3>
                            <div className="opener-down" />
                        </div>
                        <ul>
                            <div className="list-1">
                                {availableFilters.sizes.map((size, i) => {
                                    return i % 2 === 0 ? (
                                        <li key={i}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                    name="checkbox-size"
                                                    onChange={() =>
                                                        filterSelect({ size })
                                                    }
                                                    checked={
                                                        filters.size.indexOf(
                                                            size
                                                        ) !== -1
                                                    }
                                                />
                                                <span className="checkbox-custom" />{' '}
                                                <span className="label">
                                                    {size}
                                                </span>
                                            </label>
                                        </li>
                                    ) : null;
                                })}
                            </div>
                            <div className="list-2">
                                {availableFilters.sizes.map((size, i) => {
                                    return i % 2 !== 0 ? (
                                        <li key={i}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                    name="checkbox-size"
                                                    onChange={() =>
                                                        filterSelect({ size })
                                                    }
                                                    checked={
                                                        filters.size.indexOf(
                                                            size
                                                        ) !== -1
                                                    }
                                                />
                                                <span className="checkbox-custom" />{' '}
                                                <span className="label">
                                                    {size}
                                                </span>
                                            </label>
                                        </li>
                                    ) : null;
                                })}
                            </div>
                        </ul>
                    </div>
                </section>
                <div className="separator-150 separator-150-4" />
                <section className="sidebar__division">
                    <div className="sidebar__heel-height">
                        <div className="sidebar__division-title">
                            <h3>Размер каблука</h3>
                            <div className="opener-down" />
                        </div>
                        <ul>
                            <div className="list-1">
                                {availableFilters.heelSize.map((size, i) => {
                                    return i % 2 === 0 ? (
                                        <li key={i}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                    name="checbox-heelsize"
                                                    onChange={() =>
                                                        filterSelect({
                                                            heelSize: size,
                                                        })
                                                    }
                                                    checked={
                                                        filters.heelSize.indexOf(
                                                            size
                                                        ) !== -1
                                                    }
                                                />
                                                <span className="checkbox-custom" />{' '}
                                                <span className="label">
                                                    {size}
                                                </span>
                                            </label>
                                        </li>
                                    ) : null;
                                })}
                            </div>
                            <div className="list-2">
                                {availableFilters.heelSize.map((size, i) => {
                                    return i % 2 !== 0 ? (
                                        <li key={i}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    className="checkbox"
                                                    name="checkbox-heelsize"
                                                    onChange={() =>
                                                        filterSelect({
                                                            heelSize: size,
                                                        })
                                                    }
                                                    checked={
                                                        filters.heelSize.indexOf(
                                                            size
                                                        ) !== -1
                                                    }
                                                />
                                                <span className="checkbox-custom" />{' '}
                                                <span className="label">
                                                    {size}
                                                </span>
                                            </label>
                                        </li>
                                    ) : null;
                                })}
                            </div>
                        </ul>
                    </div>
                </section>
                <div className="separator-150 separator-150-5" />
                <section className="sidebar__division">
                    <div className="sidebar__occasion">
                        <div className="sidebar__division-title">
                            <h3>Повод</h3>
                            <div className="opener-down" />
                        </div>
                        <ul>
                            {availableFilters.reason.map(reason => {
                                const className =
                                    filters.reason === reason ? 'active' : '';
                                return (
                                    <li key={reason}>
                                        <a
                                            className={className}
                                            onClick={() =>
                                                filterSelect({ reason })
                                            }
                                        >
                                            {reason}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>
                <div className="separator-150 separator-150-6" />
                <section className="sidebar__division">
                    <div className="sidebar__season">
                        <div className="sidebar__division-title">
                            <h3>Сезон</h3>
                            <div className="opener-down" />
                        </div>
                        <ul>
                            {availableFilters.season.map(season => {
                                const className =
                                    filters.season === season ? 'active' : '';
                                return (
                                    <li key={season}>
                                        <a
                                            className={className}
                                            onClick={() =>
                                                filterSelect({ season })
                                            }
                                        >
                                            {season}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>
                <div className="separator-150 separator-150-7" />
                <section className="sidebar__division">
                    <div className="sidebar__brand">
                        <div className="sidebar__division-title">
                            <h3>Бренд</h3>
                            <div className="opener-down" />
                        </div>
                        <ul>
                            {availableFilters.brand.map(brand => {
                                const className =
                                    filters.brand === brand ? 'active' : '';
                                return (
                                    <li key={brand}>
                                        <a
                                            className={className}
                                            onClick={() =>
                                                filterSelect({ brand: brand })
                                            }
                                        >
                                            {brand}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <label>
                        <input
                            type="checkbox"
                            className="checkbox"
                            name="checkbox-disc"
                            onClick={event =>
                                filterSelect({
                                    discounted: event.target.checked,
                                })
                            }
                            checked={filters.discounted}
                        />
                        <span className="checkbox-discount" />{' '}
                        <span className="text-discount">Со скидкой</span>
                    </label>

                    <div className="separator-240" />
                </section>

                <section className="sidebar__division">
                    <div className="drop-down">
                        <a onClick={() => filterSelect()}>
                            <span className="drop-down-icon" />
                            Сбросить
                        </a>
                    </div>
                </section>
            </section>
        );
    }
}

export default Sidebar;
