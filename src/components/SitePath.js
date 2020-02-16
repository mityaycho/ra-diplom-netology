import React from 'react';
import { Link } from 'react-router-dom';

const SitePath = ({ url, category, title }) => (
    <div className="site-path">
        <ul className="site-path__items">
            <li className="site-path__item">
                <Link to="/">{'Главная'}</Link>
            </li>
            {category ? (
                <li className="site-path__item">
                    <Link to={url}>{category}</Link>
                </li>
            ) : null}
            <li className="site-path__item">
                <a href="">{title}</a>
            </li>
        </ul>
    </div>
);

export default SitePath;
