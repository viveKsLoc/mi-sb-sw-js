import React, { Component } from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import CountryFlagGlobal from '.';

setAddon(JSXAddon);

// create a state wrapper to the country flag global component
export class CountryFlagGlobalStateWrapper extends Component {
    // initialize the constructor
    constructor(props) {
        super(props);

        // set the default state values as below
        this.state = {
            data: [],
            showAllOfAsia: false
        }
    }

    // if the component is loaded, make an 'ajax' fetch call
    componentDidMount = () => {
        // make a get request to the restcountries.eu api
        fetch(`https://restcountries.eu/rest/v2/all`)
        .then((response) => response.json())
        .then((data) => {
            // obtain the data through promise
            // declare an empty array locally
            let asiaData = [];
            // iterate over the array
            data.map((obj, i) => {
                // if the region is equal to Asia then push the object to the array else return null
                return obj.region === 'Asia' ? asiaData.push(obj) : null
            })
            // slice the number of objects 0th index to 8th index and assign it to variable 'asia'
            let asia = asiaData.slice(0,8);
            // then, set the state data with the value of asia
            this.setState({ data: asia })
        })
        .catch((e) => { console.log(e) })
    }

    // fetch call
    callAllOfAsia = () => {
        // make a get request to the restcountries.eu api
        fetch(`https://restcountries.eu/rest/v2/all`)
        .then((response) => response.json())
        .then((data) => {
            // set the state of data to empty when the response  data is obtained
            this.setState({ data: [] })
            // declare an empty array locally
            let asiaData = [];
            // map over the objects if the region is equal to Asia then push the object to asiaData array else return null
            data.map((obj, i) => {
                return obj.region === 'Asia' ? asiaData.push(obj) : null
            })
            // set the state of data value to be the asiaData and showAllOfAsia to true
            this.setState({ data: asiaData, showAllOfAsia: true })
        })
        .catch((e) => { console.log(e) })
    }

    render() {
        return (
            // return the countryFlagGlobal component
            <CountryFlagGlobal
                // pass down all the props values through '...this.props'
                {...this.props}
                // pass down this.state.data array through countries prop
                countries={this.state.data}
                // pass down this.state.showAllOfAsia through showAllOfAsia prop
                showAllOfAsia={this.state.showAllOfAsia}
                // pass down this.callAllOfAsia through callAllOfAsia prop
                callAllOfAsia={this.callAllOfAsia}
            />
        )
    }
}

// initalize a module with its name, let's say we are gonna create stories
const stories = storiesOf('CountryFlagGlobal', module);

// add knobs to the stories through addDecorator()
stories.addDecorator(withKnobs);

// create a 'Default' story using addWithJSX()
stories.addWithJSX('Default', () => {
    const disabled = boolean('Disabled?');

    return (
        // return the complete CountryFlagGlobalStateWrapper component
        <CountryFlagGlobalStateWrapper
            disabled={disabled}
        />
    )
});
