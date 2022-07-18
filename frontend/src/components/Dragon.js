import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import DragonAvatar from './DragonAvatar';

const DEFAULT_DRAGON = {
    dragonId:  '',
    nickname: 'test',
    generationId: '',
    birthdate: '',
    traits: []
}

class Dragon extends Component{
    state = {dragon: DEFAULT_DRAGON};

    componentDidMount(){
        this.fetchDragon();
    }

    fetchDragon = () => {
        fetch('http://localhost:3000/dragon/new')
        .then(response => response.json())
        .then(json => this.setState({dragon: json.dragon }))
        .catch(error => console.error('error', error));
    }

    render(){//without callback it would be an infinite loop , since function is already a callback we can ref it (call it without the ())
        return(
        <div>
            <Button onClick={this.fetchDragon}>New Dragon</Button>
            <DragonAvatar dragon={this.state.dragon} />
        </div>
        );
    }
}

export default Dragon;

