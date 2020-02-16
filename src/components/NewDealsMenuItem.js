import React, { Component } from 'react';

class NewDealsMenuItem extends Component {
    render() {
        const { id, currentCategory, onClick, title } = this.props;
        console.log(title);
        const activeCls =
            currentCategory === id ? ' new-deals__menu-item_active' : '';
        const itemCls = `new-deals__menu-item ${activeCls}`;

        return (
            <li key={id} className={itemCls}>
                <a onClick={onClick}>{title}</a>
            </li>
        );
    }
}
export default NewDealsMenuItem;
