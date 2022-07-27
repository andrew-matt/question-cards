import {AppThunk} from "../../../app/store";
import {loginAPI} from "../login/login-api";

const SET_IS_CHANGED_PASSWORD = 'PASSWORD-NEW/SET_IS_CHANGED_PASSWORD'

const initialState = {
    isChangedPassword:false
}

type initialStateType = {
    isChangedPassword:boolean
}

export const passwordNewReducer = (state: initialStateType = initialState, action: ActionsPasswordNewType): initialStateType => {
    switch (action.type) {
        case SET_IS_CHANGED_PASSWORD:
            return {...state, isChangedPassword: action.value}
        default: {
            return state;
        }
    }
}

export type ActionsPasswordNewType = setIsChangedPasswordACType

export const setIsChangedPasswordAC = (value:boolean) => ({type:SET_IS_CHANGED_PASSWORD, value} as const)
type setIsChangedPasswordACType = ReturnType<typeof setIsChangedPasswordAC>

export const setNewPasswordTC = (password:string,resetPasswordToken:string):AppThunk => (dispatch) => {
    loginAPI.setNewPassword(password, resetPasswordToken)
        .then((res) => {
            dispatch(setIsChangedPasswordAC(true))
        })
        .catch((err) => {
            alert(err)
        })
}