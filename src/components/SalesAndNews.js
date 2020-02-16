import React from 'react';

const SalesAndNews = () => (
    <section className="sales-and-news wave-bottom">
        <h2 className="h2">акции и новости</h2>
        <div className="sales-and-news__items">
            <div className="sales-and-news__item sales-and-news__item_1">
                <a>
                    <h3 className="h3">Обувь к свадьбе</h3>
                </a>
            </div>
            <div className="sales-and-news__item sales-and-news__item_2">
                <a>
                    <h3 className="h3">
                        20% скидка
                        <br />
                        <span>На летнюю обувь</span>
                    </h3>
                </a>
            </div>
            <div className="sales-and-news__item sales-and-news__item_3">
                <a>
                    <h3 className="h3">Готовимся к лету!</h3>
                </a>
            </div>
            <div className="sales-and-news__item sales-and-news__item_4">
                <a>
                    <h3 className="h3">
                        Больше покупок –<br />
                        больше скидка!
                    </h3>
                </a>
            </div>
            <div className="sales-and-news__news">
                <div className="sales-and-news__arrow sales-and-news__arrow_up arrow" />
                <div className="sales-and-news__new">
                    <time dateTime="2017-01-18 00:00">18 января 2017</time>
                    <a>
                        Американские резиновые сапоги Bogs идеально подходят для
                        русской зимы!
                    </a>
                </div>
                <div className="sales-and-news__new">
                    <time dateTime="2017-05-18 00:00">18 мая 2017</time>
                    <a>Магазины Bosa Noga</a>
                </div>
                <div className="sales-and-news__new">
                    <time dateTime="2017-03-10 00:00">10 марта 2017</time>
                    <a>
                        Тенденция весны 2018: розовый и фуксия. 10 пар обуви для
                        яркого образа
                    </a>
                </div>
                <div className="sales-and-news__arrow sales-and-news__arrow_down arrow" />
            </div>
        </div>
    </section>
);

export default SalesAndNews;
