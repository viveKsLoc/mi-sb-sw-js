import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import Halver from '../Halver';
import SvgIcon from '../SvgIcon';
import './CountryTextOverlay.scss';

export default class CountryTextOverlay extends Component {
    static defaultProps = {}

    render() {
        // define the baseClassName variable and assign it to a classname
        let baseClassName = "pb-country-text-overlay";

        // obtain the following props from this.props object
        let {
            parentClassName,
            disabled,
            backgroundUrl,
            content
        } = this.props;

        // pass the following classnames based on the conditions if it is true
        let classes = {
            [baseClassName]: true,
            [parentClassName]: parentClassName,
            [`${baseClassName}--disabled`]: disabled
        }

        return (
            <div className={classNames(classes)}>
                {/* use the existing Halver component to display the 'backgroundUrl' */}
                <Halver className={`${baseClassName}__halver-content`} backgroundUrl={backgroundUrl}>
                    {/* use the existing SvgIcon component to display the svg 'globe-1' */}
                    <SvgIcon className={`${baseClassName}__image`} name="globe-1" />
                    {/* diplay the html content by setting the innerHTML for the div as below */}
                    <div className={`${baseClassName}__content`} dangerouslySetInnerHTML={{__html: content}}></div>
                </Halver>
            </div>
        )
    }
}

// set the static variable propTypes and pass the values to the components based on the types
CountryTextOverlay.propTypes = {
    // allow the boolean type value to the disabled prop
    disabled: PropTypes.bool,
    // allow the string type value to the backgroundUrl prop
    backgroundUrl: PropTypes.string,
    // allow the string type value to the content prop
    content: PropTypes.string
}
