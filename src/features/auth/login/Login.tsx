import {LoginForm} from "./LoginForm";
import style from "./Login.module.css"
import {Navigate, NavLink} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import React from "react";

export const Login = () => {
    const isLogin = useSelector<AppRootStateType>((state) => state.login.isLoggedIn)
    if (isLogin) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={style.login}>
            <div className={style.login__wrapper}>
                <h2 className={style.login__title}>
                    Sign in
                </h2>
                <div className={style.login__form}>
                    <LoginForm/>
                </div>
                <p className={style.login__text}>Don't have an account?</p>
                <NavLink to={'/registration'} className={style.login__signUp}>Sign up</NavLink>
            </div>

        </div>
    )
}