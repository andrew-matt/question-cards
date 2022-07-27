import {AppThunk} from "../../../app/store";
import {loginAPI} from "../login/login-api";

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
    loginAPI.forgotPassword(email)
        .then((res) => {
            dispatch(setIsPasswordResetAC(true))
        })
        .catch((err) => {
            alert(err)
        })

}
