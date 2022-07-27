import {LoginForm} from "./LoginForm";
import style from "./Login.module.css"
import {NavLink} from "react-router-dom";

export const Login = () => {
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
                <NavLink to={'/'} className={style.login__signUp}>Sigh up</NavLink>
            </div>

        </div>
    )
}