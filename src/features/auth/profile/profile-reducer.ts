import {Dispatch} from "redux";
import {ProfileAPI} from "../profile/Profile-API";

type initialStateType={
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}

const initialState:initialStateType = {
    _id: '',
    email: '',
    name: '',
    avatar: undefined,
    publicCardPacksCount: 0, // количество колод
    created: new Date,
    updated: new Date,
    isAdmin: false,
    verified: false, // подтвердил ли почту
    rememberMe: false,
    error: ''
};

type ActionsType=ReturnType<typeof SetNewNameAC>

export const profileReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "SET-NEW-NAME":
            return {...state, name:action.name}
        default: {
            return state;
        }
    }
};

export const SetNewNameAC = (name:string) => ({
    type: 'SET-NEW-NAME',
    name
}) as const

export const SetNameTC=(name:string)=>(dispatch:Dispatch)=>{
    debugger
    ProfileAPI.changeName(name)
        .then(response => {
debugger
            dispatch( SetNewNameAC(response.data.name))
        })
}