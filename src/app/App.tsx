import React, {useEffect} from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import {Header} from '../common/header/Header';
import {Main} from '../common/main/Main';
import {ErrorSnackbar} from '../common/errorSnackbar/ErrorSnackbar';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "./store";
import {AppLinearProgress} from "../common/linearProgress/AppLinearProgress";
import {initializedAppTC} from "./app-reducer";
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

function App() {
    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])
    const dispatch: AppDispatch = useDispatch()
    const status = useSelector<AppRootStateType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType>((state) => state.app.isInitialized)

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

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
