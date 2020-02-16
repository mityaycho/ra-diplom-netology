import React, { Component } from 'react';
import SitePath from './SitePath';
import { getProducts } from './fetch/gettingRequests';
import ItemCard from './ItemCard';
import Pagination from './Pagination';
import getParams from './fetch/doubleRequest';
import { getLooked } from './looked';
import OverlookedSlider from './OverlookedSlider';
import Sidebar from './Sidebar';

export default class Catalogue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categories: null,
            page: 1,
            filters: {
                categoryId: '',
                color: '',
                size: [],
                heelSize: [],
                reason: '',
                season: '',
                brand: '',
                discounted: false,
                sortBy: '',
                minPrice: '',
                maxPrice: '',
            },
        };
        this.pageSelect = this.pageSelect.bind(this);
        this.filterSelect = this.filterSelect.bind(this);
        this.request = this.props.location.search;
    }

    componentDidMount() {
        const filters = Object.assign(
            {},
            this.state.filters,
            this.splitLocation(this.props.location)
        );
        getParams(['products', this.request], 'categories').then(response =>
            this.setState({
                products: response.products,
                categories: response.categories.data,
                filters,
            })
        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.search !== this.request) {
            const filters = this.splitLocation(nextProps.location);
            this.filterSelect(filters, true);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (
            this.state.page !== nextState.page ||
            JSON.stringify(this.state.filters) !==
                JSON.stringify(nextState.filters)
        ) {
            const filters = Object.assign({}, nextState.filters);
            getProducts(this.request).then(response =>
                this.setState({
                    products: response,
                    filters,
                })
            );
        }
    }

    filterSelect(filter, isReset = false) {
        const filters = Object.assign({}, this.state.filters);
        if (isReset) {
            this.compileRequest(filter);
        } else if (!filter) {
            this.compileRequest(this.splitLocation(this.props.location));
        } else if (filter.size || filter.heelSize) {
            const filterName = Object.keys(filter)[0];
            if (filters[filterName]) {
                const index = filters[filterName].indexOf(filter[filterName]);
                index === -1
                    ? filters[filterName].push(filter[filterName])
                    : filters[filterName].splice(index, 1);
                this.compileRequest(filters);
            }
        } else {
            Object.assign(filters, filter);
            this.compileRequest(filters);
        }
    }

    pageSelect(page) {
        this.compileRequest(this.state.filters, page);
    }

    sortBy = event => {
        const { products } = this.state;
        const param = event.currentTarget.value;
        if (!products.data.length || !products.data[0][param]) return;
        products.data.sort((item1, item2) => {
            if (item1[param] > item2[param]) return 1;
            return -1;
        });
        this.setState({ products });
    };

    compileRequest(filters, page = 1) {
        let request = '?';
        Object.keys(filters).forEach(key => {
            if (key === 'size' || key === 'heelSize') {
                if (filters[key])
                    filters[key].forEach(
                        size => (request += `&${key}[]=${size}`)
                    );
            } else if (filters[key]) request += `&${key}=${filters[key]}`;
        });
        if (!filters.size) filters.size = [];
        if (!filters.heelSize) filters.heelSize = [];
        this.request = `${request}&page=${page}`;
        this.setState({ filters, page });
    }

    splitLocation(location) {
        const filter = location.search.split(/[?=&]/);
        const filters = {};
        for (let i = 1; i < filter.length; i += 2) {
            filters[filter[i]] = filter[i + 1];
        }
        return filters;
    }

    render() {
        const { products, categories, filters, page } = this.state;
        if (!categories) return null;
        const title =
            filters.categoryId && categories.length
                ? categories.find(el => el.id === parseInt(filters.categoryId))
                      .title
                : filters.search
                    ? 'Результаты поиска'
                    : 'Все товары';

        return (
            <div>
                <SitePath category="Каталог" url="/Catalogue/" title={title} />
                <main className="product-catalogue">
                    <Sidebar
                        filters={filters}
                        filterSelect={this.filterSelect}
                    />
                    <section className="product-catalogue-content">
                        <section className="product-catalogue__head">
                            <div className="product-catalogue__section-title">
                                <h2 className="section-name">{title}</h2>
                                <span className="amount">
                                    {products.goods} товар(а/ов)
                                </span>
                            </div>
                            <div className="product-catalogue__sort-by">
                                <p className="sort-by">Сортировать</p>
                                <select
                                    onChange={this.sortBy}
                                    name=""
                                    id="sorting"
                                    defaultValue="brand"
                                >
                                    <option value="brand">
                                        по производителю
                                    </option>
                                    <option value="price">по цене</option>
                                </select>
                            </div>
                        </section>
                        <section className="product-catalogue__item-list">
                            {products.data.map(item => (
                                <ItemCard
                                    {...item}
                                    products={this.state.products.data}
                                />
                            ))}
                        </section>
                        {products.pages === 1 ? null : (
                            <Pagination
                                selectedPage={page}
                                pages={products.pages}
                                pageSelect={this.pageSelect}
                            />
                        )}
                    </section>
                </main>
                {!getLooked()[0] ? null : (
                    <section className="product-catalogue__overlooked-slider">
                        <h3>Вы смотрели:</h3>
                        <OverlookedSlider />
                    </section>
                )}
            </div>
        );
    }
}
