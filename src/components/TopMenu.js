import React, { Component } from 'react';

class TopMenu extends Component {
    constructor(props) {
        super(props);
        this.topMenuItems = [
            'Возврат',
            'Доставка и оплата',
            'О магазине',
            'Контакты',
            'Новости',
        ];
    }

    render() {
        return (
            <div className="top-menu">
                <div className="wrapper">
                    <ul className="top-menu__items">
                        <TopMenuItems items={this.topMenuItems || []} />
                    </ul>
                </div>
            </div>
        );
    }
}

const TopMenuItems = ({ items }) => {
    return items.map((item, idx) => (
        <li key={idx} className="top-menu__item">
            <a>{item}</a>
        </li>
    ));
};

export default TopMenu;
