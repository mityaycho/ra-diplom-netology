import React from 'react';

const Pagination = ({ selectedPage, pages, pageSelect }) => {
    const listPages = [];

    for (let i = 1; i <= pages; i++) {
        listPages.push(i);
    }

    return (
        <div className="product-catalogue__pagination">
            <div className="page-nav-wrapper">
                <div className="angle-back">
                    <a
                        onClick={() =>
                            pageSelect(
                                selectedPage === 1
                                    ? selectedPage
                                    : selectedPage - 1
                            )
                        }
                    />
                </div>
                <ul>
                    {listPages.map(page => {
                        const className = selectedPage === page ? 'active' : '';
                        return (
                            <li key={page} className={className}>
                                <a onClick={() => pageSelect(page)}>{page}</a>
                            </li>
                        );
                    })}
                </ul>
                <div className="angle-forward">
                    <a
                        onClick={() =>
                            pageSelect(
                                selectedPage === listPages.length
                                    ? selectedPage
                                    : selectedPage + 1
                            )
                        }
                    />
                </div>
            </div>
        </div>
    );
};

export default Pagination;
