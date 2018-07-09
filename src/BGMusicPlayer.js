import React, { Component } from 'react';
import Select from '@material-ui/core/Select';

class BGMusicPlayer extends Component {

    constructor() {
        super()
        this.state = {
            music: undefined,
        };
    }

    handleChange(event) {
        this.setState({music: event.target.value});
        this.playSoundFromRef();
    }

    turnOff(event) {
        this.setState({music: undefined});
    }

    playSoundFromRef() {
        // this.ref.pause()
        // this.ref.currentTime = 0;
        console.log("FIRES", this.ref)
        this.ref.play()
    }

    render() {
        const { on, sourcePath, options } = this.props;
        if (!on) {
            () => this.turnOff();
        }
        return (
            <div>
                <Select
                    native
                    disabled={on ? false : true}
                    value={this.state.music}
                    onChange={(event) => this.handleChange(event)}
                >
                    <option value={undefined}>{"Choose Background Music"}</option>
                    {
                        // only display more options if the player is on
                        on ? options.map((song) => {
                            return <option key={song} value={song}>{song}</option>
                        }) : null
                    }

                </Select>
                {console.log(sourcePath + this.state.music)}
                {/* create the audio ref */}
                {this.state.music ?
                    <audio ref={(ref) => { this.ref = ref; }}>
                        {/* fix path */}
                        <source src={".." + sourcePath + this.state.music} type="audio/mpeg" />
                    </audio>
                    : null
                }


            </div>

            );
        }
    }

export default BGMusicPlayer;

/* <audio ref={(ref) => { this.ref = ref; }}>
    <source src={source} type="audio/mpeg" />
</audio> */
