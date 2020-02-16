import React from 'react';
import OverlookedSlider from './OverlookedSlider';
import { getLooked } from './looked';

const Overlooked = () => {
    if (getLooked()) {
    }
    console.log('TCL: Overlooked -> getLooked()', getLooked());
    return (
        <section className="product-catalogue__overlooked-slider">
            <h3>Вы смотрели:</h3>
            <OverlookedSlider />
        </section>
    );
};

export default Overlooked;
