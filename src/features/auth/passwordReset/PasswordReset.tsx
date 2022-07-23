import style from './PasswordReset.module.css'
import {PasswordResetForm} from "./PasswordResetForm";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import checkEmail from '../../../assets/img/checkEmail.png'

export const PasswordReset = () => {
    const [isPasswordReset, setIsPasswordReset] = useState(false)

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
                            <NavLink to={'/login'}>Back to login</NavLink>
                        </div>
                    </div>
                    :
                    <div className={style.passwordReset}>
                        <div className={style.passwordReset__wrapper}>
                            <h2 className={style.passwordReset__title}>Forgot your password?</h2>
                            <div className={style.passwordReset__form}>
                                <PasswordResetForm setIsPasswordReset={setIsPasswordReset}/>
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