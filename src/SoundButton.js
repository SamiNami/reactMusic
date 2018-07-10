import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class SoundButton extends Component {
    render() {
        const { title, source, onAudioButtonClick } = this.props;
        return (
            <Button variant="contained" color="primary" className="big" onClick={() => {onAudioButtonClick(this.ref)}}>
                {title}
                <audio ref={(ref) => { this.ref = ref; }}>
                    <source src={source} type="audio/mpeg" />
                </audio>
            </Button>
            );
        }
    }

export default SoundButton;
