import { useFormik } from 'formik';
import React from 'react';
import style from "./PasswordForgot.module.css";
import TextField from "@mui/material/TextField/TextField";
import {Button} from "@mui/material";
import {forgotPasswordTC} from "../passwordForgot/password-forgot-reducer";
import {AppDispatch} from "../../../app/store";
import {useDispatch} from "react-redux";



export const PasswordForgotForm:React.FC = () => {

    type FormikErrorType = {
        email?: string
    }

    const dispatch:AppDispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(forgotPasswordTC(values.email))
        },
    });
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
                <p className={style.form__text}>
                    Enter your email address and we will send you further instructions
                </p>
                <Button
                    type={'submit'}
                    variant={'contained'}
                    color={'primary'}
                >
                    Send Instructions
                </Button>
            </form>
        </div>
    )
};