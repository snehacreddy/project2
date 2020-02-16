import React from 'react';
import ReactDOM from 'react-dom';
import  './index.css';
import Game from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Game />, document.getElementById('root'));
serviceWorker.unregister();
