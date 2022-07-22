import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import {Header} from '../common/header/Header';
import {Main} from '../common/main/Main';

function App() {
    return (
        <div className="App">
            <HashRouter>
                <Header/>
                <Main/>
            </HashRouter>
        </div>
    );
}

export default App;
