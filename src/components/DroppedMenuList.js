import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

export default class DroppedMenuList extends Component {
	render() {
		const { list, title, type, cls, categorie } = this.props;
		const clsName = `dropped-menu__lists ${cls}`;
		return (
			<div className={clsName}>
				<h3 className="dropped-menu__list-title">{title}</h3>
				<ul ref className="dropped-menu__list">
					{list.map((listItem, index) => {
						if (type !== 'brand') {
							return (
								<li key={index} className="dropped-menu__item">
									<Link to={`/catalogue/?categoryId=${categorie}&${type}=${listItem}`}>
										{listItem}
									</Link>
								</li>
							);
						} else {
							if (index <= 5) {
								return (
									<li key={index} className="dropped-menu__item">
										<Link to={`/catalogue/?categoryId=${categorie}&${type}=${listItem}`}>
											{listItem}
										</Link>
									</li>
								);
							} else if (index === 6) {
								return (
									<li key={index} className="dropped-menu__item">
										<Link to={`/catalogue/?categoryId=${categorie}`}>
											Все
                                        </Link>
									</li>
								);
							}
						}
					})}
				</ul>
			</div>
		);
	}
}
