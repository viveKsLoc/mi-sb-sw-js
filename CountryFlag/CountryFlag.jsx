import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import globe from '../../../public/flag-globe-blue.png';
import Caret from '../Caret';

import './CountryFlag.scss';

class CountryFlag extends Component {
    // add the props varibales to defaultProps required if any
    static defaultProps = {}

    // initialize the constructor
    constructor(props) {
        super(props);
        // set the default state values as below
        this.state = {
            image: 'https://restcountries.eu/data/ind.svg',
            text: 'India',
            isClicked: false,
            isSelected: false
        }
    }

    handleDivClick = (e) => {
        // on click of this handler
        // if this.state.isSelected is true
        if(this.state.isSelected) {
            // then, set this.state.isClicked to false
            this.setState({ isClicked: false });
        } else {
            // else, set this.state.isClicked to true
            this.setState({ isClicked: true });
        }
    }

    handleListClick = (e) => {
        // on click of this handler
        // if event target's innerText is equal to below string
        if(e.target.innerText === 'See all countries and regions') {
            // call the function callAll() through props
            this.props.callAll();
            // set the state values as below
            this.setState({
                isClicked: false,
                image: e.target.children[0].src,
                text: e.target.innerText,
                isSelected: true
            })
        } else {
            // else, set the state values as below, except the isSelected
            this.setState({
                isClicked: false,
                image: e.target.children[0].src,
                text: e.target.innerText
            })
        }
    }

    handleListAllClick = (e) => {
        // on click of this handler
        // set the state values as below, except the isSelected
        this.setState({
            image: e.target.children[0].src,
            text: e.target.innerText,
            isSelected: false
        });
    }

    render() {
        // declare the baseClassName variable and assign a value to it
        const baseClassName = "pb-country-flag";

        // obtain the following props from this.props object
        let {
            parentClassName,
            disabled,
            data
        } = this.props;

        // pass the following classnames based on the conditions if it is true
        let classes = {
            [baseClassName]: true,
            [parentClassName]: parentClassName,
            [`${baseClassName}__content--disabled`]: disabled
        };

        // declare an array of objects with default values as below
        const defaultOptions = [
            { name: 'India', flag: 'https://restcountries.eu/data/ind.svg' },
            { name: 'Global', flag: globe },
            { name: 'See all countries and regions', flag: '' }
        ];

        return (
            <div className={classNames(classes)}>
                <label className={`${baseClassName}__label`}>Region</label>
                {/* call the handleDivClick event handler onClick function */}
                <div className={`${baseClassName}__content`} onClick={this.handleDivClick}>
                    {/* set the value of the source to this.state.image */}
                    <img className={`${baseClassName}__content-image`} alt="" src={this.state.image} />
                    {/* set the value of the innerText to this.state.text */}
                    <span className={`${baseClassName}__content-text`}>{this.state.text}</span>
                    <Caret className={`${baseClassName}__content-arrow`} />
                </div>
                {
                    // if this.state.isClicked is true
                    this.state.isClicked ?
                    // render the below div with the list of countries
                    <div className={`${baseClassName}__countries`}>
                    {
                        // if this.state.isClicked is true
                        this.state.isClicked ?
                        // iterate over the defaultOptions array
                        defaultOptions.map((item, index) => {
                            return (
                                // call this.handleListClick event handler onClick function on the elements
                                <li className={`${baseClassName}__countries-list`} key={index} onClick={this.handleListClick}>
                                    <img className={`${baseClassName}__countries-image`} alt="" src={item.flag} />
                                    {item.name}
                                </li>
                            )
                        })
                        :   null
                    }
                    </div>
                    : null
                }
                {
                    // if this.state.isSelected is true
                    this.state.isSelected ?
                    <div className={`${baseClassName}__countries`}>
                    {
                        // if this.state.isSelected is true
                        this.state.isSelected ?
                        // iterate over the data and build the below list of elements
                        data.map((item, index) => {
                            return (
                                // call the handleListAllClick event handler onClick function on the elements
                                <li className={`${baseClassName}__countries-list`} key={index} onClick={this.handleListAllClick}>
                                    <img className={`${baseClassName}__countries-image`} alt="" src={item.flag} />
                                    {item.name}
                                </li>
                            )
                        })
                        // else, return null
                        :   null
                    }
                    </div>
                    // else, return null
                    : null
                }
            </div>
        )
    }
}

// set the static variable propTypes and pass the values to the components based on the types
CountryFlag.propTypes = {
    // allow the boolean type values to disabled prop
    disabled: PropTypes.bool,
    // allow any of the below values in the array object below to align prop
    align: PropTypes.oneOf([
        'right',
        'left'
    ])
}

export default CountryFlag;
