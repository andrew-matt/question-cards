import React from 'react';
import {AppDispatch, AppRootStateType} from "../../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import {loginTC} from "./login-reducer";
import {Navigate, NavLink} from "react-router-dom";
import style from "./Login.module.css";
import TextField from '@mui/material/TextField/TextField';
import {Button, Checkbox, FormControlLabel} from "@mui/material";

export const LoginForm: React.FC = () => {
    const dispatch: AppDispatch = useDispatch()
    const isLogin = useSelector<AppRootStateType>((state) => state.login.isLoggedIn)

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: string
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length < 8) {
                errors.password = 'Password must be 8 characters or more';
            }

            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(loginTC(values))
        },
    });

    if (isLogin) {
        return <Navigate to={'/profile'}/>
    }

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className={style.form}>
                <TextField
                    className={style.form__email}
                    id="standard-required"
                    label="Email"
                    type={"email"}
                    variant="standard"
                    {...formik.getFieldProps('email')}
                />
                {
                    formik.touched.email && formik.errors.email
                        ? <div style={{color:"red", fontWeight:"bold"}}>{formik.errors.email}</div>
                        : <div style={{height: "19px"}}></div>
                }

                <TextField
                    className={style.form__password}
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    {...formik.getFieldProps('password')}
                />
                {
                    formik.touched.password && formik.errors.password
                        ? <div style={{color:"red", fontWeight:"bold"}}>{formik.errors.password}</div>
                        : <div style={{height: "19px"}}></div>
                }

                <FormControlLabel
                    className={style.form__rememberMe}
                    label={'Remember me'}
                    control={<Checkbox/>}
                    checked={formik.values.rememberMe}
                    {...formik.getFieldProps('rememberMe')}
                />
                <NavLink to={'/password-reset'} className={style.form__forgotPassword}>Forgot password?</NavLink>
                <Button
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}>
                    Login
                </Button>
            </form>
        </div>
    )
};