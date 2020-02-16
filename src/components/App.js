import '../css/normalize.css';
import '../css/font-awesome.min.css';
import '../css/style.css';
import '../css/style-catalogue.css';
import '../css/style-order.css';
import '../css/style-product-card.css';
import '../css/style-favorite.css';

import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import MainPage from './MainPage';
import Catalogue from './Catalogue';
import Order from './Order';
import ProductCard from './ProductCard';
import Favorite from './Favorite';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            needUpdate: false,
        };
        this.update = this.update.bind(this);
    }

    update() {
        this.setState({ needUpdate: true });
    }

    getProductCard(props) {
        return <ProductCard {...props} update={this.update} />;
    }

    render() {
        const { categories } = this.state;
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <div className="container">
                    <Header update={this.update} />
                    <Switch>
                        <Route path="/order/" component={Order} />
                        <Route
                            path="/catalogue/:category"
                            component={Catalogue}
                        />
                        <Route path="/catalogue/" component={Catalogue} />
                        <Route
                            path="/item/:id"
                            render={props => this.getProductCard(props)}
                        />
                        <Route path="/favorite/" component={Favorite} />
                        <Route exact path="/">
                            <MainPage categories={categories} />
                        </Route>
                    </Switch>
                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
