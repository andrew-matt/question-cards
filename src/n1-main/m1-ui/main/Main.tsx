import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import {Login} from '../../../n2-features/f1-auth/a1-login/Login';
import {Registration} from '../../../n2-features/f1-auth/a2-registration/Registration';
import {Profile} from '../../../n2-features/f1-auth/a3-profile/Profile';
import {Error404} from '../../../n2-features/f1-auth/a4-error404/Error404';
import {PasswordReset} from '../../../n2-features/f1-auth/a5-passwordReset/PasswordReset';
import {PasswordNew} from '../../../n2-features/f1-auth/a6-passwordNew/PasswordNew';
import {Test} from '../../../n2-features/f1-auth/a7-test/Test';


export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    ERROR_404: '/error-404',
    PASSWORD_RESET: '/password-reset',
    PASSWORD_NEW: '/password-new',
    TEST: '/test',
};

export const Main = () => {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.LOGIN}/>}/>
                <Route path={'/*'} element={<Navigate to={PATH.ERROR_404}/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.ERROR_404} element={<Error404/>}/>
                <Route path={PATH.PASSWORD_RESET} element={<PasswordReset/>}/>
                <Route path={PATH.PASSWORD_NEW} element={<PasswordNew/>}/>
                <Route path={PATH.TEST} element={<Test/>}/>
            </Routes>
        </div>
    );
};
