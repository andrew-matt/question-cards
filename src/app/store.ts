import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {loginReducer} from '../features/auth/login/login-reducer';
import {registrationReducer, setIsRegistered} from '../features/auth/registration/registration-reducer';
import {profileReducer} from '../features/auth/profile/profile-reducer';
import {errorReducer} from '../features/auth/error404/error-reducer';
import {passwordResetReducer} from '../features/auth/passwordReset/password-reset-reducer';
import {passwordNewReducer} from '../features/auth/passwordNew/password-new-reducer';
import {testReducer} from '../features/auth/test/test-reducer';
import {appReducer, setAppErrorAC} from './app-reducer';

const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    error: errorReducer,
    passwordReset: passwordResetReducer,
    passwordNew: passwordNewReducer,
    test: testReducer,
});

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, ActionTypes>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, ActionTypes>

export type ActionTypes = ReturnType<typeof setIsRegistered>
    | ReturnType<typeof setAppErrorAC>

// @ts-ignore
window.store = store;

export default store;