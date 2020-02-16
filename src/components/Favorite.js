import React, { Component } from 'react';
import SitePath from './SitePath';
import CardItem from './CardItem';
import Pagination from './Pagination';

export default class Favorite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favorite: [],
            pages: 1,
            page: 1,
        };
        this.updateFavorite = this.updateFavorite.bind(this);
        this.pageSelect = this.pageSelect.bind(this);
    }

    componentDidMount() {
        this.updateFavorite();
    }

    pageSelect(page) {
        this.setState({ page });
    }

    updateFavorite() {
        const favorite = localStorage.getItem('favorite');
        if (favorite) {
            const parsed = JSON.parse(favorite);
            this.setState({
                favorite: parsed,
                pages: Math.ceil(parsed.length / 12),
            });
        }
    }

    sortBy = event => {
        const { favorite } = this.state;
        const param = event.currentTarget.value;
        if (!favorite.length || !favorite[0][param]) return;
        favorite.sort((item1, item2) => {
            if (item1[param] > item2[param]) return 1;
            return -1;
        });
        this.setState({ favorite });
    };

    render() {
        const { favorite, pages, page } = this.state;
        return (
            <div className="wrapper wrapper_favorite">
                <SitePath title="Избранное" />
                {favorite.length ? (
                    <main className="product-catalogue product-catalogue_favorite">
                        <section className="product-catalogue__head product-catalogue__head_favorite">
                            <div className="product-catalogue__section-title">
                                <h2 className="section-name">
                                    В вашем избранном
                                </h2>
                                <span className="amount amount_favorite">
                                    {' '}
                                    {favorite.length} товар(а/ов)
                                </span>
                            </div>
                            {favorite.length && (
                                <div className="product-catalogue__sort-by">
                                    <p className="sort-by">Сортировать</p>
                                    <select
                                        onChange={this.sortBy}
                                        id="sorting"
                                        name=""
                                        defaultValue="brand"
                                    >
                                        <option value="brand">
                                            по производителю
                                        </option>
                                        <option value="price">по цене</option>
                                    </select>
                                </div>
                            )}
                        </section>
                        <CardItem
                            products={
                                pages > 1
                                    ? favorite.slice((page - 1) * 12, 12 * page)
                                    : favorite
                            }
                            favorite
                            updateFavorite={this.updateFavorite}
                        />
                        {pages < 2 ? null : (
                            <Pagination
                                pages={pages}
                                selectedPage={page}
                                pageSelect={this.pageSelect}
                            />
                        )}
                    </main>
                ) : (
                    <h1>В ВАШЕМ ИЗБРАННОМ ПОКА НИЧЕГО НЕТ</h1>
                )}
            </div>
        );
    }
}
