import {combineReducers, legacy_createStore} from 'redux';
import {loginReducer} from './login-reducer';
import {registrationReducer} from './registration-reducer';
import {profileReducer} from './profile-reducer';
import {errorReducer} from './error-reducer';
import {passwordResetReducer} from './password-reset-reducer';
import {passwordNewReducer} from './password-new-reducer';
import {testReducer} from './test-reducer';

const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    error: errorReducer,
    passwordReset: passwordResetReducer,
    passwordNew: passwordNewReducer,
    test: testReducer,
})

const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>

export default store;