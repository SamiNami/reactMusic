import React, { Component } from 'react';
import './App.css';
import SoundButton from "./SoundButton.js";

class MusicBoard extends Component {

    constructor() {
        super();
        this.state = {
            power: "off",
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

            if (this.state.power === "off") {
                return;
            }
            let buttonData;
            // index handles onClick
            if (i || i === 0) {
                buttonData = this.buttons[i];
                console.log(i, buttonData)
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

    togglePower() {
        if (this.state.power === "off") {
            this.setState({
                power: "on",
                // description: "--------"
            });
            return
        }
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.setState({
            power: "off",
            description: "--------"
        });
    }

    render() {
        return (
            <div
                className="container"
                autoFocus
                tabIndex="-1"
                onKeyDown={(e) => this.onKeyPressed(e)}
            >
            <div onClick={() => this.togglePower()}>
                {this.state.power}
            </div>
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
