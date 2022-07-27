import style from './PasswordForgot.module.css'
import {PasswordForgotForm} from "./PasswordForgotForm";
import React, {useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import checkEmail from '../../../assets/img/checkEmail.png'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {setIsPasswordResetAC} from "./password-forgot-reducer";

export const PasswordForgot = () => {

    const isPasswordReset = useSelector<AppRootStateType>(state => state.passwordForgot.isPasswordReset)
    const dispatch = useDispatch()

    const seSwitchtIsResetPasswordToFalseHandler = () => {
        dispatch(setIsPasswordResetAC(false))
    }

    return (
        <>
            {
                isPasswordReset ?
                    <div className={style.passwordReset}>
                        <div className={style.passwordReset__wrapper}>
                            <h2 className={style.passwordReset__title}>Check Email</h2>
                            <img src={checkEmail}/>
                            <p className={style.form__text }>
                                We’ve sent an Email with instructions to example@mail.com
                            </p>
                            <NavLink to={'/login'} onClick={seSwitchtIsResetPasswordToFalseHandler}>Back to login</NavLink>
                        </div>
                    </div>
                    :
                    <div className={style.passwordReset}>
                        <div className={style.passwordReset__wrapper}>
                            <h2 className={style.passwordReset__title}>Forgot your password?</h2>
                            <div className={style.passwordReset__form}>
                                <PasswordForgotForm/>
                            </div>
                            <p className={style.passwordReset__text}>
                                Did you remember your password?
                            </p>
                            <NavLink to={'/login'}>Try logging in</NavLink>
                        </div>
                    </div>
            }

        </>

    )
}