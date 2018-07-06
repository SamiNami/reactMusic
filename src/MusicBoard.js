import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';

class MusicBoard extends Component {

    constructor() {
        super();
        this.state = {
            instrument: "drum",
        };

    }

    render() {

        return (
            <div className="container">
                {/* top-panel */}
                <div>
                    <div>
                        {this.state.instrument}
                    </div>
                    <div>
                        <audio ref={(green) => { this.green = green; }}>
                            {/* https://s3.amazonaws.com/freecodecamp/simonSound4.mp3 */}
			                         <source src={process.env.PUBLIC_URL + "c.mp3"} type="audio/mpeg" >
			                              </source>
		                  </audio>
                        <Button variant="contained" color="primary" onClick = {() => {this.green.play()}} >
                            Change instrument
                        </Button>



                    </div>
                </div>

                Kappa
                {/* buttons */}

            </div>
            );
        }
    }

export default MusicBoard;
