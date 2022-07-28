import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import {Header} from '../common/header/Header';
import {Main} from '../common/main/Main';
import {ErrorSnackbar} from '../common/errorSnackbar/ErrorSnackbar';
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {AppLinearProgress} from "../common/linearProgress/AppLinearProgress";

function App() {
    const status = useSelector<AppRootStateType>((state) => state.app.status)

    return (
        <div className="App">
            <HashRouter>
                {status === 'loading' && <AppLinearProgress/>}
                <Header/>
                <Main/>
                <ErrorSnackbar/>
            </HashRouter>
        </div>
    );
}

export default App;
