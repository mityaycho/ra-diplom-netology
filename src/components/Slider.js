import React, { Component } from 'react';
import { slider, sliderStop } from '../js/slider';
import slide from '../img/slider.jpg';
import nextSlide from '../img/slider180deg.jpeg';

class Slider extends Component {
    constructor(props) {
        super(props);

        this.references = {
            slider: null,
            sliderImages: [],
            sliderCircles: [],
            sliderArrows: [],
        };

        this.setRef = {
            slider: node => (this.references.slider = node),
            sliderImage: node => this.references.sliderImages.push(node),
            sliderCircle: node => this.references.sliderCircles.push(node),
            sliderArrow: node => this.references.sliderArrows.push(node),
        };
    }

    componentDidMount() {
        let f = this.references.slider;
        let a = this.references.sliderImages;
        let button = this.references.sliderCircles;
        let navButtons = this.references.sliderArrows;
        slider(f, a, button, '4000', '1000', navButtons);
    }

    componentWillUnmount() {
        sliderStop();
    }

    shouldComponentUpdate() {
        return false;
    }

    render() {
        return (
            <section className="slider">
                <div className="wrapper">
                    <div className="slider__pictures" ref={this.setRef.slider}>
                        <a
                            className="slider__image"
                            ref={this.setRef.sliderImage}
                        >
                            <img src={slide} alt="slide 1" />
                        </a>
                        <a
                            className="slider__image"
                            ref={this.setRef.sliderImage}
                        >
                            <img src={nextSlide} alt="slide 2" />
                        </a>
                        <a
                            className="slider__image"
                            ref={this.setRef.sliderImage}
                        >
                            <img src={slide} alt="slide 3" />
                        </a>
                        <a
                            className="slider__image"
                            ref={this.setRef.sliderImage}
                        >
                            <img src={nextSlide} alt="slide 4" />
                        </a>
                        <div
                            className="arrow slider__arrow slider__arrow_left"
                            ref={this.setRef.sliderArrow}
                        />
                        <div
                            className="arrow slider__arrow slider__arrow_right"
                            ref={this.setRef.sliderArrow}
                        />
                        <div className="slider__circles">
                            <button
                                className="slider__circle"
                                value="0"
                                ref={this.setRef.sliderCircle}
                            />
                            <button
                                className="slider__circle"
                                value="1"
                                ref={this.setRef.sliderCircle}
                            />
                            <button
                                className="slider__circle"
                                value="2"
                                ref={this.setRef.sliderCircle}
                            />
                            <button
                                className="slider__circle"
                                value="3"
                                ref={this.setRef.sliderCircle}
                            />
                        </div>
                        <h2 className="h2">К весне готовы!</h2>
                    </div>
                </div>
            </section>
        );
    }
}

export default Slider;
