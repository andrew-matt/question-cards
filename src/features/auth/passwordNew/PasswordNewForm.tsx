import React from "react";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import style from "../passwordNew/PasswordNew.module.css";
import TextField from "@mui/material/TextField/TextField";
import {Button} from "@mui/material";
import {setIsChangedPasswordAC, setNewPasswordTC} from "./password-new-reducer";
import {NavLink} from "react-router-dom";

type PasswordNewFormPropsType = {
    token:string
}

export const PasswordNewForm: React.FC<PasswordNewFormPropsType> = (props) => {
    const {
        token
    } = props

    const dispatch: AppDispatch = useDispatch()
    const isPasswordChanged = useSelector<AppRootStateType>((state) => state.passwordNew.isChangedPassword)

    type FormikErrorType = {
        password?: string
    }

    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length < 8) {
                errors.password = 'Password must be 8 characters or more';
            }
            return errors;
        },
        onSubmit: (values) => {
            dispatch(setNewPasswordTC(values.password,token))
        },
    });

    const switchIsChangedPasswordToFalseHandler = () => dispatch(setIsChangedPasswordAC(false))

    return (
 <>
     {
         isPasswordChanged ?
             <div>
                 <p className={style.form__text_success}>
                     Password has been changed =)
                 </p>
                 <NavLink to={'/login'} onClick={switchIsChangedPasswordToFalseHandler}>Back to login</NavLink>
             </div>
             :
             <div>
                 <form onSubmit={formik.handleSubmit} className={style.form}>
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
                     <p className={style.form__text}>
                         Create new password and we will send you further instructions to email
                     </p>
                     <Button
                         type={'submit'}
                         variant={'contained'}
                         color={'primary'}>
                         Create new password
                     </Button>
                 </form>
             </div>

     }
 </>

    )
};