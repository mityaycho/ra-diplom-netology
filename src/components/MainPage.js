import React from 'react';
import Slider from './Slider';
import NewDeals from './NewDeals';
import SalesAndNews from './SalesAndNews';
import AboutUs from './AboutUs';

const MainPage = props => (
    <div>
        <Slider />
        <NewDeals categories={props.categories} />
        <SalesAndNews />
        <AboutUs />
    </div>
);

export default MainPage;
