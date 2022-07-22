import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {ActionsLoginType, loginReducer} from '../features/auth/login/login-reducer';
import {registrationReducer} from '../features/auth/registration/registration-reducer';
import {profileReducer} from '../features/auth/profile/profile-reducer';
import {errorReducer} from '../features/auth/error404/error-reducer';
import {passwordResetReducer} from '../features/auth/passwordReset/password-reset-reducer';
import {passwordNewReducer} from '../features/auth/passwordNew/password-new-reducer';
import {testReducer} from '../features/auth/test/test-reducer';
import thunk, {ThunkAction, ThunkDispatch } from 'redux-thunk'

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    error: errorReducer,
    passwordReset: passwordResetReducer,
    passwordNew: passwordNewReducer,
    test: testReducer,
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = ActionsLoginType

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>


export default store;