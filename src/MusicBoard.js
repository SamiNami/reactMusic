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
                        <Button variant="contained" color="primary">
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
