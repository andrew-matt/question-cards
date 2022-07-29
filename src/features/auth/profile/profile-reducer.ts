import {ProfileAPI} from "../profile/Profile-API";
import {AppThunk} from "../../../app/store";
import {AxiosError} from "axios";
import {setAppErrorAC} from "../../../app/app-reducer";


export type UserDataType= {
    avatar: null | string
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string | null
    tokenDeathTime: number | null
    updated: string
    verified: boolean
    __v: number | null
    _id: string
}
type initialStateType={
    UserData: UserDataType
}

const initialState:initialStateType = {
    UserData: {
        _id: '',
        email: '',
        name: '',
        avatar: null,
        publicCardPacksCount: 0,
        created: '',
        updated: '',
        isAdmin: false,
        verified: false,
        rememberMe: false,
        __v: null,
        tokenDeathTime: null,
        token: null
    }
};

export type ActionsProfileType=ReturnType<typeof SetNewNameAC>
    | ReturnType<typeof SetProfileAC>
|ReturnType<typeof SetNewPhotoAC>

export const profileReducer = (state: initialStateType = initialState, action: ActionsProfileType): initialStateType => {
    switch (action.type) {
        case "SET-NEW-NAME":
            return {...state, UserData:{...state.UserData, name: action.name}};
        case "SET-PROFILE":
            return {...state, UserData:{...state.UserData, ...action.profile} }
        case "SET-NEW-PHOTO":
            return {...state,UserData:{...state.UserData,avatar:action.photo}}
        default: {
            return state;
        }
    }
};


export const SetProfileAC=(profile:UserDataType)=>({
    type:'SET-PROFILE',
        profile
}as const)
export const SetNewNameAC = (name:string) => ({
    type: 'SET-NEW-NAME',
    name
}as const)
export const SetNewPhotoAC=(photo:string)=>({
    type:'SET-NEW-PHOTO',
    photo
} as const )

export const SetNameTC=(name:string):AppThunk=>(dispatch)=>{

    ProfileAPI.changeNameorAvatar(name, '')
        .then(response => {
            dispatch( SetNewNameAC(response.data.updatedUser.name))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            dispatch(setAppErrorAC(error))
        })
}
export const SetPhotoTC=(avatar:any):AppThunk=>(dispatch)=>{

    ProfileAPI.changeNameorAvatar('',avatar)
        .then(response => {
            dispatch( SetNewPhotoAC(response.data.updatedUser.avatar))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            dispatch(setAppErrorAC(error))
        })
}
