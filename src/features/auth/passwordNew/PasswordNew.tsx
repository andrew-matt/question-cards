import style from './PasswordNew.module.css'
import {useParams} from "react-router-dom";
import React from "react";
import {PasswordNewForm} from "./PasswordNewForm";

export const PasswordNew = () => {
    const {userToken} = useParams()
    if (userToken) {
        return (
            <div className={style.passwordNew}>
                <div className={style.passwordNew__wrapper}>
                    <h2 className={style.passwordNew__title}>Create new password</h2>
                    <div className={style.passwordNew__form}>
                        <PasswordNewForm token={userToken}/>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <>
                Something Wrong
            </>
        )
    }
}