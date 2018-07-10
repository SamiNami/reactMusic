import React, { Component } from "react";
import "./App.css";
import SoundButton from "./SoundButton.js";
import BGMusicPlayer from "./BGMusicPlayer.js"
import Switch from '@material-ui/core/Switch';

class MusicBoard extends Component {

    constructor() {
        super();
        this.state = {
            power: "off",
            description: "--------",
        };
        // bound button, sounds source, description
        this.buttons = [
            ["Q", process.env.PUBLIC_URL + "/sound/q.wav", "Clap 1"],
            ["W", process.env.PUBLIC_URL + "/sound/w.wav", "Clap 2"],
            ["E", process.env.PUBLIC_URL + "/sound/e.wav", "Crash 1"],
            ["D", process.env.PUBLIC_URL + "/sound/d.wav", "Crash 2"],
            ["S", process.env.PUBLIC_URL + "/sound/s.wav", "Hihat 1"],
            ["A", process.env.PUBLIC_URL + "/sound/a.wav", "Hihat 2"],
            ["Z", process.env.PUBLIC_URL + "/sound/z.wav", "Kick"],
            ["X", process.env.PUBLIC_URL + "/sound/x.wav", "Perc"],
            ["C", process.env.PUBLIC_URL + "/sound/c.wav", "Snap"],
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
            this.setState({power: "on"});
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

    turnOn(event){
        this.setState({power: event.target.value});
    }

    render() {
        return (
            <div className="container center" onKeyDown={(e) => this.onKeyPressed(e)}>
                <div className="top-panel">Drum Machine</div>
                <div className="top-panel">
                    <Switch
                        className="item"
                        checked={this.state.power === "on" ? true : false}
                        onChange={(event) => this.turnOn(event)}
                        value={this.state.power === "on" ? "off" : "on"}
                    />
                    <BGMusicPlayer
                        className="item"
                        on={this.state.power === "on" ? true : false}
                        sourcePath={process.env.PUBLIC_URL + "../sound/"}
                        options={["strings.wav", "synth.wav", "vocals.wav"]}
                    />
                    <div className="panel">
                        {this.state.description}
                    </div>
                </div>
                <div className="bottom-panel">
                    {
                        this.buttons.map((buttonData, index) => {
                            return (
                                <SoundButton
                                    ref={(ref) => this.buttons[index].push(ref)}
                                    key={buttonData[0]}
                                    title={buttonData[0]}
                                    source={buttonData[1]}
                                    onAudioButtonClick={() => this.onAudioButtonClick(index)}
                                />
                            )
                        })
                    }
                </div>

            </div>
            );
        }
    }

export default MusicBoard;
