import {AxiosError} from 'axios';
import {authAPI, RegisterParamsType} from '../../../api/cards-api';
import {AppActionsType, AppDispatch, AppThunk} from '../../../app/store';
import {setAppErrorAC} from '../../../app/app-reducer';

const initialState = {
    isRegistered: false,
};

type InitialStateType = typeof initialState

export const registrationReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-IS-REGISTERED':
            return {...state, isRegistered: action.isRegistered};
        default: {
            return state;
        }
    }
};

//actions
export const setIsRegistered = (isRegistered: boolean) => ({type: 'SET-IS-REGISTERED', isRegistered} as const);

//thunks
export const register = (data: RegisterParamsType): AppThunk => (dispatch: AppDispatch) => {
    authAPI.register(data)
        .then(() => {
            dispatch(setIsRegistered(true));
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message;
            dispatch(setAppErrorAC(error));
        });
};

