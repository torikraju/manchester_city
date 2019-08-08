import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'

import Routes from './Routes';
import './resources/css/app.css';

const App = ()=>(
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));

