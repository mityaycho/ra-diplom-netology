import React, { Component } from 'react';
import { mainSubmenuVisibility } from '../js/script';

class MainMenu extends Component {
    render() {
        const { categories } = this.props;
        return (
            <nav className="main-menu">
                <div className="wrapper">
                    <ul className="main-menu__items">
                        {categories.map(category => (
                            <li
                                onClick={mainSubmenuVisibility}
                                key={category.id}
                                className="main-menu__item"
                            >
                                <a>{category.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        );
    }
}

export default MainMenu;
