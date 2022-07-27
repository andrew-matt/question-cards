import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {loginReducer} from '../features/auth/login/login-reducer';
import {registrationReducer} from '../features/auth/registration/registration-reducer';
import {profileReducer} from '../features/auth/profile/profile-reducer';
import {errorReducer} from '../features/auth/error404/error-reducer';
import {passwordResetReducer} from '../features/auth/passwordReset/password-reset-reducer';
import {passwordNewReducer} from '../features/auth/passwordNew/password-new-reducer';
import {testReducer} from '../features/auth/test/test-reducer';
import thunk from 'redux-thunk'


const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    profile: profileReducer,
    error: errorReducer,
    passwordReset: passwordResetReducer,
    passwordNew: passwordNewReducer,
    test: testReducer,
})

const store = legacy_createStore(rootReducer,applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

export default store;