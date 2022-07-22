import { useFormik } from 'formik';
import style from './Login.module.css'
import {loginTC} from "./login-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import { Navigate } from 'react-router-dom';
import {Profile} from "../profile/Profile";

export const Login = () => {
    const dispatch:AppDispatch = useDispatch()
    const isLogin = useSelector<AppRootStateType>((state) => state.login.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: "",
            password:"",
            rememberMe:false
        },
        onSubmit: (values) => {
            dispatch(loginTC(values))
        },
    });

    if (isLogin) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div className={style.mainBlock}>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    onChange={formik.handleChange}
                    checked={formik.values.rememberMe}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}