import React, {Component} from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import CountryLanguageSelect from '.';

setAddon(JSXAddon);

// create a state wrapper to the country flag component
export class CountryLanguageSelectStateWrapper extends Component {
  // initialize the constructor
  constructor(props) {
    super(props);

    // set the default state values as below
    this.state = {
      allOptions: [],
      showAll: false,
      value: null
    }
  }

  // call the callCountries through the props
  callCountries = () => {
    // make a get request to the restcountries.eu api
    fetch(`https://restcountries.eu/rest/v2/all`)
    .then((response) => response.json())
    .then((data) => {
      // obtain the data through promise
      // declare an empty array locally
      let allOptions = [];
      // iterate over the array
      data.map((obj) => obj.languages.map((lang, i) => {
          // itertate over the languages
          // push the nativeName and name to the allOptions array on every iteration
          return allOptions.push({
              'name': `${lang.nativeName}`,
              'queryValue': `${lang.name}`
          })
      }))
      // concat the state of allOptions with with newly obtained values in local allOptions
      // and set the showAll to true
      this.setState({
        allOptions: this.state.allOptions.concat(allOptions),
        showAll: true
      })
    })
    .catch((e) => console.log(e));
  }

  onChangeHandler = (value) => {
    // on click of the handler
    // check the this.state.value if it is not equal to the value from the parameter
    if (this.state.value !== value) {
      // and if value is strictly equal to 'all'
      if (value === 'all') {
        // call the function callCountrires()
        this.callCountries();
      } else {
        // else, set the value of state with the value from the parameter
        this.setState({ value })
      }
    }
  }

  render() {
    // default options array
    const options = [
      { name: "English", queryValue: "english" },
      { name: "Hindi", queryValue: "hindi" },
      { name: "Marati", queryValue: "marati" },
      { name: "See all languages", queryValue: "all" }
    ]

    // defaults options array
    const defaults = [
      { name: "English", queryValue: "english" },
      { name: "Hindi", queryValue: "hindi" },
      { name: "Marati", queryValue: "marati" }
    ]

    return <CountryLanguageSelect
      // pass down all the props to the returning component
      {...this.props}
      // set options if the showAll value in the state is true
      // if false send the options array
      // if true send the concatenation of defaults with allOptions
      options={this.state.showAll ? defaults.concat(this.state.allOptions) : options}
      // onChange event call the onChangeHandler function()
      onChange={this.onChangeHandler}
      // pass this.state.showAll value through 'showAll' prop
      showAll={this.state.showAll}
      // pass this.state.value's value through 'value' prop
      value={this.state.value}
    />
  }
}

// initalize a module with its component name, let's say we are gonna create stories for the component
const stories = storiesOf('CountryLanguageSelect', module);

// add knobs to the stories through addDecorator()
stories.addDecorator(withKnobs);

// create a 'Default' story using addWithJSX()
stories.addWithJSX('Default', () => {
  const id = text('ID', 'storybook-select-field');
  const label = text('Label', 'Language');
  const name = text('Name');
  const disabled = boolean('Disabled?');
  const loading = boolean('Loading?');

  return <CountryLanguageSelectStateWrapper
    // pass a value for id through 'id' prop
    id={id}
    // pass a value for label through 'label' prop
    label={label}
    // pass a value for name through 'name' prop
    name={name}
    // pass disabled true or false through 'disabled' prop
    disabled={disabled}
    // pass loading true or false through 'loading' prop
    loading={loading}
    // pass an action as a value to the 'onChange' prop
    onChange={action('select-field-value-changed')}
  />
});
