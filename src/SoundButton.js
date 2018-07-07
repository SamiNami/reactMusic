import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class SoundButton extends Component {

    constructor() {
        super();
    }

    render() {
        const { title, source, description, onAudioButtonClick } = this.props;
        return (

            <Button onClick={() => {onAudioButtonClick(this.ref)}}>
                {title}
                <audio ref={(ref) => { this.ref = ref; }}>
                    <source src={source} type="audio/mpeg" />
                </audio>
            </Button>
            );
        }
    }

export default SoundButton;
