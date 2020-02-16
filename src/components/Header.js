import React, { Component } from 'react';

import TopMenu from './TopMenu';
import HeaderMain from './HeaderMain';
import MainMenu from './MainMenu';
import DroppedMenu from './DroppedMenu';
import getParams from './fetch/doubleRequest';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            filters: null,
            currentCategory: 0,
        };
    }

    componentDidMount() {
        getParams('categories', 'filters')
            .then(result =>
                this.setState({
                    categories: result.categories.data,
                    filters: result.filters.data,
                })
            )
            .catch(e => console.log(e));
    }

    componentDidUpdate() {
        const mainMenu = document.querySelectorAll('.main-menu__item');

        for (let item of mainMenu) {
            item.onclick = event => {
                const activeCategory = this.state.categories.find(
                    el =>
                        el.title.toLowerCase() ===
                        event.currentTarget.children[0].innerText.toLowerCase()
                );
                this.setState({
                    currentCategory: activeCategory.id,
                });
            };
        }
    }

    render() {
        return (
            <header className="header">
                <TopMenu />
                <HeaderMain update={this.props.update} />
                <MainMenu categories={this.state.categories} />
                <DroppedMenu
                    filters={this.state.filters}
                    currentCategory={this.state.currentCategory}
                />
            </header>
        );
    }
}

export default Header;
