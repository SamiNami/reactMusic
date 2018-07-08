import React, { Component } from 'react';
import './App.css';
import SoundButton from "./SoundButton.js";

class MusicBoard extends Component {

    constructor() {
        super();
        this.state = {
            description: "--------",
        };
        // bound button, sounds source, description
        this.buttons = [
            ["Q", process.env.PUBLIC_URL + "/sound/q.wav", "Clap" ],
            ["W", process.env.PUBLIC_URL + "/sound/w.wav", "Clap 2" ],
        ];
    }

    onKeyPressed(e) {
        // pass the key as uppercase
        this.onAudioButtonClick(false, e.key.toUpperCase());
    }

    onAudioButtonClick(i, key) {
            let buttonData;
            // index handles onClick
            if (i) {
                buttonData = this.buttons[i];

            // else hanlde buttonpress
            } else {
                buttonData = this.buttons.find((singleButton) => {
                    return singleButton[0] === key;
                });
                if (!buttonData) {
                    return;
                }
            }
            this.displayDescription(buttonData[2]);
            this.playSoundFromRef(buttonData[3].ref);
    }

    displayDescription(description) {
        this.setState({description});
        // timeout used for setting the discpiton back to ----- after 500 ms
        if (!this.timeout) {
            this.timeout = setTimeout(() => {
                this.setState({description: "--------"});
            }, 500);
            return
        }
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.setState({description: "--------"});
        }, 500);
    }


    playSoundFromRef(ref) {
        ref.pause()
        ref.currentTime = 0;
        ref.play()
    }

    render() {
        return (
            <div
                className="container"
                autoFocus
                tabIndex="-1"
                onKeyDown={(e) => this.onKeyPressed(e)}
            >
            <div>{this.state.description}</div>
                {
                    this.buttons.map((buttonData, index) => {
                        return (
                            <SoundButton
                                ref={(ref) => { this.buttons[index].push(ref)}}
                                key={buttonData[0]}
                                title={buttonData[0]}
                                source={buttonData[1]}
                                description={buttonData[2]}
                                onAudioButtonClick={() => this.onAudioButtonClick(index)}
                             />
                        )
                    })
                }
            </div>
            );
        }
    }

export default MusicBoard;
