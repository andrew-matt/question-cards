import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {ActionsLoginType, loginReducer} from '../features/auth/login/login-reducer';
import {registrationReducer} from '../features/auth/registration/registration-reducer';
import {profileReducer} from '../features/auth/profile/profile-reducer';
import {errorReducer} from '../features/auth/error404/error-reducer';
import {ActionsForgotPasswordType, passwordForgotReducer} from '../features/auth/passwordForgot/password-forgot-reducer';
import {ActionsPasswordNewType, passwordNewReducer} from '../features/auth/passwordNew/password-new-reducer';
import {testReducer} from '../features/auth/test/test-reducer';
import thunk, {ThunkAction, ThunkDispatch } from 'redux-thunk'

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    error: errorReducer,
    passwordForgot: passwordForgotReducer,
    passwordNew: passwordNewReducer,
    test: testReducer,
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = ActionsLoginType | ActionsForgotPasswordType | ActionsPasswordNewType

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export default store;