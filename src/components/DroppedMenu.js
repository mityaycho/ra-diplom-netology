import React from 'react';
import DroppedMenuList from './DroppedMenuList';
import { mainSubmenuVisibility } from '../js/script';

const DroppedMenu = ({ filters, currentCategory }) => {
    if (!filters) {
        return null;
    }
    return (
        <div className="dropped-menu" onMouseLeave={mainSubmenuVisibility}>
            <div className="wrapper">
                <DroppedMenuList
                    list={filters.reason || []}
                    title={'Повод:'}
                    type="reason"
                    cls="dropped-menu__lists_women"
                    categorie={currentCategory}
                />
                <DroppedMenuList
                    list={filters.type || []}
                    title={'Категории:'}
                    type="type"
                    cls="dropped-menu__lists_three-coloumns"
                    categorie={currentCategory}
                />
                <DroppedMenuList
                    list={filters.season || []}
                    title={'Сезон:'}
                    type="season"
                    cls=""
                    categorie={currentCategory}
                />
                <DroppedMenuList
                    list={filters.brand || []}
                    title={'Бренд:'}
                    type="brand"
                    cls=""
                    categorie={currentCategory}
                />
            </div>
        </div>
    );
};

export default DroppedMenu;
