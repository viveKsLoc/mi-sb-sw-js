import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SelectField from '../SelectField';

export default class CountryLanguageSelect extends Component {
  static defaultProps = {};

  render() {
    // define the baseClassName variable and assign it to a classname
    let baseClassName = "pb-country-language-select";

    // obtain the following props from this.props object
    let {
      parentClassName,
      options,
      onChange,
      showAll
    } = this.props;

    // pass the following classnames based on the conditions if it is true
    let classes = {
      [baseClassName]: true,
      [parentClassName]: parentClassName
    }

    return (
      <div className={classNames(classes)}>
        <label className={`${baseClassName}__label`}>Language</label><div/>
        {/* if this.state.showAll is true */}
        {
          showAll
          ?
            // return the SelectField with options and onChange event props
            <SelectField
              options={options}
              onChange={onChange}
            />
          :
            // return the SelectField with options and onChange event props
            <SelectField
              options={options}
              onChange={onChange}
            />
        }
      </div>
    )
  }
}

// set the static variable propTypes and pass the values to the components based on the types
CountryLanguageSelect.propTypes = {
  // allow the string type values to name prop
  name: PropTypes.string,
  // allow the any type of values to value prop
  value: PropTypes.any,
  // allow the array type value which consists of two fields name and queryValue to options prop
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    queryValue: PropTypes.string.isRequired
  })),
  // allow functions to onChange prop
  onChange: PropTypes.func,
  // allow the boolean type value to showAll prop
  showAll: PropTypes.bool
}
