import React, { Component } from 'react';
import {skinny, slender, patchy, plain, sporty, spotted, stocky, striped} from '../assets';

const propertyMap = {
    backgroundColor: {
        black: '#263238',
        white: '#cfd8dc',
        green: '#a5d6a7',
        blue: '#0277bd',
},
    build: {slender, stocky, sporty, skinny},
    pattern: {plain, striped, spotted, patchy},
    size: {
        small: 150,
        medium: 250,
        large: 400,
        huge: 600,
    }
};

class DragonAvatar extends Component{

    get DragonImage(){
        const dragonPropertyMap = {};

        this.props.dragon.traits.forEach(trait => {
            const {traitType, traitValue} = trait;

            dragonPropertyMap[traitType] = propertyMap[traitType][traitValue];
        });

        const {backgroundColor, build, pattern, size} = dragonPropertyMap;

        const sizing = {width: size, height: size};

        return (
            <div className='dragon-avatar-image-wrapper'>
                <div className='dragon-avatar-image-background' style={{backgroundColor, ...sizing }}></div>
                <img src={pattern} className='dragon-avatar-image-pattern' style={{...sizing}}/>
                <img src={build}className='dragon-avatar-image'style={{...sizing}}/>
            </div>
        );
    }

    render(){
        const {generationId, dragonId, traits} = this.props.dragon; //props pass down from parent(dragon) to child(here)

        return (
            <div>
                <span>Gen:{generationId}, </span>
                <span>Id:{dragonId}- </span>

                { traits.map(trait => trait.traitValue).join(', ') }
                {this.DragonImage }
            </div>
        )
    }
}

export default DragonAvatar;