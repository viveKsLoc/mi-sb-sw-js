import React from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import CountryTextOverlay from '.';

setAddon(JSXAddon);

// create a state wrapper to the countryTextOverlay component
export class CountryTextOverlayStateWrapper extends React.Component {
    // initialize the constructor
    constructor(props) {
        super(props);
        // set the default state values as below
        this.state = {
            image: 'https://storage.googleapis.com/story-weaver-e2e-production/illustration_crops/23275/size7/7180ab1f3fede909148ef8c30f7d7b82.jpg',
            content: `
                <h2 class="pb-country-text-overlay__title">Choose your country or region</h2>
                <p class="pb-country-text-overlay__text">By setting your region, StoryWeaver will be able to suggest more relevant content to you</p>
            `
        }
    }

    render() {
        return (
            // return the CountryTextOverlay component
            <CountryTextOverlay
                // pass down all the props to the returning component
                {...this.props}
                // pass this.state.image through 'backgroundUrl' prop
                backgroundUrl={this.state.image}
                // pass this.state.content through 'content' prop
                content={this.state.content}
            />
        )
    }
}

// initalize a module with its component name, let's say we are gonna create stories for the component
const stories = storiesOf('CountryTextOverlay', module);

// add knobs to the stories through addDecorator() method
stories.addDecorator(withKnobs);

// create a 'Default' story using addWithJSX() method
stories.addWithJSX('Default', () => {
    const disabled = boolean('Disabled?');

    return (
        <CountryTextOverlayStateWrapper
            // pass disabled true or false through the disabled prop
            disabled={disabled}
        />
    )
});
