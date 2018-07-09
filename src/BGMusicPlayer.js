import React, { Component } from 'react';
import Select from '@material-ui/core/Select';

class BGMusicPlayer extends Component {

    constructor() {
        super()
        this.state = {
            music: "off",
        };
        
        this.songs = {};
    }

    handleChange(event) {
        this.setState({music: event.target.value});
    }

    turnOff(event) {
        this.setState({music: "off"});
    }


    componentDidUpdate(prevProps, prevState) {

        if (!this.props.on) {
            this.turnAllOff(this.songs);
        }

        if (prevState.music === this.state.music) {
            return;
        }

        if (this.state.music && this.songs[this.state.music]) {
            this.turnAllOff(this.songs)
            this.songs[this.state.music].loop = true;
            this.songs[this.state.music].play();
        }
    }

    turnAllOff(songs) {
        for (let audioTag in songs) {
            songs[audioTag].pause()
            songs[audioTag].currentTime = 0;
        }
    }

    createAudio(on, sourcePath, options) {

        if (this.state.music === "off") {
            return
        }

        return options.map((singleOption) => {
            return (
                <audio key={singleOption} ref={(ref) => { this.songs[singleOption] = ref; }}>
                    {/* fix path */}
                    <source src={".." + sourcePath + singleOption} type="audio/mpeg" />
                </audio>
            )
        });
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
                    <option value={"off"}>{"Choose Background Music"}</option>
                    {
                        // only display more options if the player is on
                        on ? options.map((song) => {
                            return <option key={song} value={song}>{song}</option>
                        }) : null
                    }

                </Select>

                {this.createAudio(on, sourcePath, options)}
            </div>

            );
        }
    }

export default BGMusicPlayer;

/* <audio ref={(ref) => { this.ref = ref; }}>
    <source src={source} type="audio/mpeg" />
</audio> */
