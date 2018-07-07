import React, { Component } from 'react';
import './App.css';
import SoundButton from "./SoundButton.js";

class MusicBoard extends Component {

    constructor() {
        super();
        this.state = {
            instrument: "drum",
        };
        // binded button, sounds source, description
        this.buttons = [
            ["Q", process.env.PUBLIC_URL + "/sound/q.wav", "Clap" ],
            ["W", process.env.PUBLIC_URL + "/sound/w.wav", "Clap 2" ],
        ];

    }

    onKeyPressed(e) {
        // filter out bad keys
        console.log("Pressed", e.key.toUpperCase());
        this.onAudioButtonClick(false, e.key.toUpperCase());
    }

    onAudioButtonClick(i, key) {
            let ref;
            // index handles onClick
            if (i) {
                const buttonData = this.buttons[i];
                ref = buttonData[3].ref;
            // else hanlde buttonperss
            } else {
                const found = this.buttons.find((buttonData) => {
                    return buttonData[0] === key;
                });
                console.log("--", found);
                if (!found) {
                    return;
                }
                ref = found[3].ref
            }

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
            // <div
            //     className="container"
            //     autoFocus
            //     tabIndex="-1"
            //     onKeyDown={(e) => this.onKeyPressed(e)}
            //  >
            //
            //             <Button variant="contained" color="primary" onClick = {() => {
            //                 this.green.pause()
            //                 this.green.currentTime = 0;
            //                 // sound.currentTime = 0;
            //                 this.green.play()
            //
            //             }} >
            //
            //             <audio ref={(green) => { this.green = green; }}>
			//                          <source src={process.env.PUBLIC_URL + "/sound/w.wav"} type="audio/mpeg" >
			//                               </source>
		    //               </audio>
            //                 Change instrument
            //             </Button>
            // </div>
            );
        }
    }

export default MusicBoard;
