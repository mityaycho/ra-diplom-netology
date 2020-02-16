import React, { Component } from 'react';
import getParams from './fetch/doubleRequest';
import FeaturedSlider from './FeaturedSlider';

class NewDeals extends Component {
    constructor(props) {
        super(props);
        this.dealList = [
            'Женская обувь',
            'Мужская обувь',
            'Детская обувь',
            'Аксессуары',
            'Для дома',
        ];
        this.state = {
            featured: [],
            categories: [],
            currentCategory: '',
            currentItem: 1,
        };
        this.setFilter = this.setFilter.bind(this);
        this.setProductInfo = this.setProductInfo.bind(this);
    }

    componentDidMount() {
        getParams('categories', 'featured')
            .then(response =>
                this.getCategories(
                    response.featured.data,
                    response.categories.data
                )
            )
            .catch(error => console.log(error));
    }

    getCategories(featured, categories) {
        const featureCategories = categories.filter(category => {
            for (let feature of featured) {
                if (feature.categoryId === category.id) {
                    return true;
                }
            }
        });
        this.setState({
            categories: featureCategories,
            featured: featured,
            currentCategory: featureCategories[0].id,
        });
    }

    setProductInfo(index) {
        this.setState({ currentItem: index });
    }

    setFilter(id) {
        this.setState({ currentCategory: id, currentItem: 1 });
    }

    render() {
        const {
            featured,
            categories,
            currentItem,
            currentCategory,
        } = this.state;
        if (featured.length === 0) {
            return null;
        }
        return (
            <section className="new-deals wave-bottom">
                <h2 className="h2">Новинки</h2>
                <div className="new-deals__menu">
                    <MenuItems
                        items={categories}
                        action={this.setFilter}
                        currentCategory={currentCategory}
                    />
                </div>
                <FeaturedSlider
                    featured={featured.filter(
                        item => item.categoryId === currentCategory
                    )}
                    setProductInfo={this.setProductInfo}
                />
                <FeaturedInfo
                    featured={featured.filter(
                        item => item.categoryId === currentCategory
                    )}
                    currentItem={currentItem}
                />
            </section>
        );
    }
}

const FeaturedInfo = ({ featured, currentItem }) => {
    return (
        <div className="new-deals__product-info">
            <a href="product-card-desktop.html" className="h3">
                {featured[currentItem].title}
            </a>
            <p>
                Производитель:
                <span>{featured[currentItem].brand}</span>
            </p>
            <h3 className="h3">{featured[currentItem].price} ₽</h3>
        </div>
    );
};

const MenuItems = ({ items, action, currentCategory }) => {
    if (items === null) {
        return null;
    }

    return (
        <ul className="new-deals__menu-items">
            {items.map((item, i) => (
                <li
                    className={
                        currentCategory === item.id
                            ? 'new-deals__menu-item new-deals__menu-item_active'
                            : 'new-deals__menu-item'
                    }
                    key={i}
                >
                    <a onClick={() => action(item.id)}>{item.title}</a>
                </li>
            ))}
        </ul>
    );
};

export default NewDeals;
