import {AppThunk} from "../../../app/store";
import {loginAPI} from "../login/login-api";
import {setAppErrorAC, setAppRequestStatusAC} from "../../../app/app-reducer";
import {AxiosError} from "axios";

const SET_IS_PASSWORD_RESET = 'PASSWORD_FORGOT/SET_IS_PASSWORD_RESET'

const initialState = {
    isPasswordReset:false
}

type initialStateType = {
    isPasswordReset:boolean
}


export const passwordForgotReducer = (state: initialStateType = initialState, action: ActionsForgotPasswordType): initialStateType => {
    switch (action.type) {
        case SET_IS_PASSWORD_RESET:
            return {...state, isPasswordReset: action.value}
        default: {
            return state;
        }
    }
}

export type ActionsForgotPasswordType = setIsPasswordResetACType

export const setIsPasswordResetAC = (value:boolean) => ({type:SET_IS_PASSWORD_RESET, value} as const)
type setIsPasswordResetACType = ReturnType<typeof setIsPasswordResetAC>

export const forgotPasswordTC = (email:string):AppThunk => (dispatch) => {
    dispatch(setAppRequestStatusAC('loading'))
    loginAPI.forgotPassword(email)
        .then((res) => {
            dispatch(setIsPasswordResetAC(true))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            dispatch(setAppErrorAC(error))
        })
        .finally(() => {
            dispatch(setAppRequestStatusAC('idle'))
        })

}
