import {loginAPI, LoginParamsType} from "./login-api";
import { AppThunk} from "../../../app/store";


const SET_IS_LOGGED_IN = "LOGIN/SET_IS_LOGGED_IN"

const initialState = {
    isLoggedIn: false
};

type InitialStateType = {
    isLoggedIn: boolean
}

export const loginReducer = (state: InitialStateType = initialState, action: ActionsLoginType): InitialStateType => {
    switch (action.type) {
        case SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.value}
        default: {
            return state;
        }
    }
};

export type ActionsLoginType = setIsLoggedInACType

//ACTIONS
export const setIsLoggedInAC = (value: boolean) => ({type: SET_IS_LOGGED_IN, value} as const)
export type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>

//THUNKS

export const loginTC = (data: LoginParamsType):AppThunk => (dispatch) => {
    loginAPI.login(data)
        .then((res) => {
            dispatch(setIsLoggedInAC(true))
        })
        .catch((err) => {
            alert(err.response.data.error)
        })
}

