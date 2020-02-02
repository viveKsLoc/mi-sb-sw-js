import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import flagGlobeBlue from '../../../public/flag-globe-blue.png';

import SvgIcon from '../SvgIcon';
import './CountryFlagGlobal.scss';

export default class CountryFlagGlobal extends Component {
    // add the props varibales to defaultProps required if any
    static defaultProps = {}

    // initialize the constructor
    constructor(props) {
        super(props);
        // set the default state values as below
        this.state = {
            text: 'Global Site',
            image: flagGlobeBlue
        }
    }

    handleClick = (e) => {
        // on click of this handler
        // assign the event target innerText to variable 'text'
        let text = e.target.innerText;
        // iterate over the countires array from the props return the image and text values
        this.props.countries.map((obj, i) => {
            return obj.nativeName === text ? this.setState({
                image: obj.flag,
                text: obj.nativeName
            }) : null
        })
    }

    handleAllOfAsia = () => {
        // call the callAllOfAsia() through props
        this.props.callAllOfAsia();
    }

    render() {
        // define the baseClassName variable and assign it to a classname
        let baseClassName = "pb-country-flag-global";

        // obtain the following props from this.props object
        let {
            parentClassName,
            disabled,
            countries
        } = this.props;

        // pass the following classnames based on the conditions if it is true
        let classes = {
            [baseClassName]: true,
            [parentClassName]: parentClassName,
            [`${baseClassName}__bottom-division`]: disabled
        }

        return (
            <div className={classNames(classes)}>
                <div className={`${baseClassName}--overlay--dark`}></div>
                <div className={`${baseClassName}__container`}>
                    <div className={`${baseClassName}__bounds`}>
                        <div className={`${baseClassName}__wrapper`}>
                            <div className={`${baseClassName}__content`}>
                                {/* take the background image from story-weaver stored apis and also put it in css style's attribute backgroundImage where it takes url */}
                                <div className={`${baseClassName}__background-img`} style={{ backgroundImage: "url('https://storage.googleapis.com/story-weaver-e2e-production/illustration_crops/23275/size7/7180ab1f3fede909148ef8c30f7d7b82.jpg')" }}>
                                    <div className={`${baseClassName}__first`}>
                                        <SvgIcon className={`${baseClassName}__side-content-image`} name="globe-1" />
                                        <h2 className={`${baseClassName}__side-content-heading`}>Choose your country or region</h2>
                                        <p className={`${baseClassName}__side-content-text`}>By setting your region, StoryWeaver will be able to suggest more relevant content to you</p>
                                    </div>
                                    <div className={`${baseClassName}__last`}>
                                        <div className={`${baseClassName}__top-division`}>
                                            <span className={`${baseClassName}__top-division-header`}>WORLDWIDE</span>
                                            <hr className={`${baseClassName}__top-division-divider`} />
                                            <div className={`${baseClassName}__top-division-content`}>
                                                {/* set the value of image source from this.state.image */}
                                                <img className={`${baseClassName}__top-division-content-image`} alt="" src={this.state.image} />
                                                {/* set the value of innerText from this.state.text */}
                                                <span className={`${baseClassName}__top-division-content-text`}>{this.state.text}</span>
                                            </div>
                                        </div>
                                        <div className={`${baseClassName}__bottom-division`}>
                                            <span className={`${baseClassName}__bottom-division-header`}>ASIA</span>
                                            <hr className={`${baseClassName}__bottom-division-divider`} />
                                            {/* map/iterate over the array where you find objects */}
                                            {countries.map((obj, i) => {
                                                return (
                                                    // add an onClick event and assign a event handler to every element/object
                                                    <div className={`${baseClassName}__bottom-division-content`} key={i} onClick={this.handleClick}>
                                                        {/* let the source be the value from object flag field */}
                                                        <img className={`${baseClassName}__bottom-division-content-image`} alt="" src={obj.flag} />
                                                        {/* let the innerText be the value from object nativeName field */}
                                                        <span className={`${baseClassName}__bottom-division-content-text`}>{obj.nativeName}</span>
                                                    </div>
                                                )
                                            })}
                                            {/* map/iterate over the array showAllOfAsia from props */}
                                            {this.props.showAllOfAsia ? null
                                                    // if showAllOfAsia is not true, display the below html content
                                                    // add onClick event which calls handleAllOfAsia event handler
                                                :   <div className={`${baseClassName}__all-content`} onClick={this.handleAllOfAsia}>
                                                        <SvgIcon className={`${baseClassName}__all-content-image`} name="flag-globe-blue" />
                                                        <span className={`${baseClassName}__all-content-text`}>All of asia</span>
                                                    </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// set the static variable propTypes and pass the values to the components based on the types
CountryFlagGlobal.propTypes = {
    // allow the boolean type values to disabled prop
    disabled: PropTypes.bool,
    // allow the object type values of an array to countries prop
    countries: PropTypes.arrayOf(PropTypes.object)
}
