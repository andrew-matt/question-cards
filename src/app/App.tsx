import React, {useEffect} from 'react';
import './App.css';
import {HashRouter, useNavigate} from 'react-router-dom';
import {Header} from '../common/header/Header';
import {Main} from '../common/main/Main';
import {ErrorSnackbar} from '../common/errorSnackbar/ErrorSnackbar';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from './store';
import {AppLinearProgress} from '../common/linearProgress/AppLinearProgress';
import {initializedAppTC} from './app-reducer';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {AppBar, Button, Toolbar} from '@mui/material';
import {logoutTC} from '../features/auth/login/login-reducer';

function App() {
    useEffect(() => {
        dispatch(initializedAppTC());
    }, []);

    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const status = useSelector<AppRootStateType>((state) => state.app.status);
    const isLoggedIn = useSelector<AppRootStateType>((state) => state.login.isLoggedIn);

    const isInitialized = useSelector<AppRootStateType>((state) => state.app.isInitialized);
    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>;

    }
    return (
        <div className="App">
            <AppBar position="static" color={'default'}>
                <Toolbar>
                    {isLoggedIn
                        ? <Button
                            variant={'contained'}
                            color="primary"
                            onClick={() => dispatch(logoutTC())}
                        >
                            Log out
                        </Button>
                        : <Button
                            variant={'contained'}
                            color="primary"
                            onClick={() => navigate('/login')}
                        >
                            Sign in
                        </Button>}
                </Toolbar>
                <div style={{height: '3px'}}>{status === 'loading' && <AppLinearProgress/>}</div>
            </AppBar>
            <Header/>
            <Main/>
            <ErrorSnackbar/>
        </div>
    );
}

export default App;
