import {AppActionsType} from './store';

const initialState: InitialStateType = {
    error: null,
    status: 'idle'
};

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-ERROR':
            return {...state, error: action.error};
        case "APP/SET-STATUS":
            return {...state, status:action.status}
        default:
            return {...state};
    }
};

export type InitialStateType = {
    error: string | null
    status: RequestStatusType
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type ActionsAppReducerType = setAppErrorACType
    | setAppRequestStatusAC

//ACTIONS
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
type setAppErrorACType = ReturnType<typeof setAppErrorAC>

export const setAppRequestStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
type setAppRequestStatusAC = ReturnType<typeof setAppRequestStatusAC>

//THUNKS
