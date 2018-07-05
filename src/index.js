import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MusicBoard from './MusicBoard';
import registerServiceWorker from './registerServiceWorker';
import "typeface-roboto";

ReactDOM.render(<MusicBoard />, document.getElementById('root'));
registerServiceWorker();
