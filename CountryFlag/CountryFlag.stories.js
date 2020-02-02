import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import globe from '../../../public/flag-globe-blue.png';

import CountryFlag from '.';

setAddon(JSXAddon);

// create a state wrapper to the country flag component
export default class CountryFlagStateWrapper extends React.Component {
    // initialize the constructor
    constructor(props) {
        super(props);
        // set the state values as below
        this.state = {
            data: []
        }
    }

    // when callAll() is called through the props
    // make a 'ajax' fetch request to an external restcountrires.eu api
    callAll = () => {
        // set the default values in allOptions array
        let allOptions = [{ name: 'Global', flag: globe }];
        // make a fetch call
        fetch(`https://restcountries.eu/rest/v2/all`)
        // convert the response to json
        .then((response) => response.json())
        // take the data and set the data and concat it to allOptions and assign it to this.state.data
        .then((data) => { this.setState({ data: allOptions.concat(data) }) })
        .catch((e) => { console.log(e) });
    }

    render() {
        return (
            // render the country flag component 
            <CountryFlag
                // take all the props through rest operator '...this.props' and make it available for the CountryFlag
                {...this.props}
                // pass this.state.data to the data prop
                data={this.state.data}
                // pass the this.callAll function through callAll prop
                callAll={this.callAll}
            />
        )
    }
}

// initalize a module with its name, let's say we are gonna create stories
const stories = storiesOf('CountryFlag', module);

// add knobs to the stories through addDecorator()
stories.addDecorator(withKnobs);

// create a 'Default' story using addWithJSX()
stories.addWithJSX('Default', () => {
    const disabled = boolean('Disabled?');

    return (
        // return the complete countryFlagStateWrapper component
        <CountryFlagStateWrapper
            disabled={disabled}
        />
    )
});
