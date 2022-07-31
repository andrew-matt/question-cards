import {AxiosError} from 'axios';
import {AppThunk} from '../../../app/store';
import {setAppErrorAC, setAppRequestStatusAC} from '../../../app/app-reducer';
import {packsAPI, ResponseCardPackType, UpdatePackParamsType} from './packs-api';

const initialState: ResponseCardPackType[] = [];

export const packsReducer = (state: InitialStateType = initialState, action: PacksReducerActionTypes): InitialStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS-LIST':
            return [...state, ...action.cardPacks];
        case 'packs/CLEAR-PACKS-LIST':
            return [];
        default: {
            return state;
        }
    }
};

//actions
export const setPacksList = (cardPacks: ResponseCardPackType[]) => ({type: 'packs/SET-PACKS-LIST', cardPacks} as const);
export const clearPacksList = () => ({type: 'packs/CLEAR-PACKS-LIST'} as const);

//thunks
export const fetchPacks = (): AppThunk => (dispatch) => {
    dispatch(setAppRequestStatusAC('loading'));
    packsAPI.getPacks()
        .then((res) => {
            dispatch(setPacksList(res.data.cardPacks));
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
            dispatch(setAppRequestStatusAC('idle'));
        });
};

export const addPack = (): AppThunk => (dispatch) => {
    dispatch(setAppRequestStatusAC('loading'));
    packsAPI.createPack()
        .then((res) => {
            dispatch(clearPacksList());
            dispatch(fetchPacks());
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
            dispatch(setAppRequestStatusAC('idle'));
        });
};

export const removePack = (packID: string): AppThunk => (dispatch) => {
    dispatch(setAppRequestStatusAC('loading'));
    packsAPI.deletePack(packID)
        .then((res) => {
            dispatch(clearPacksList());
            dispatch(fetchPacks());
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
            dispatch(setAppRequestStatusAC('idle'));
        });
};

export const changePack = (data: UpdatePackParamsType): AppThunk => (dispatch) => {
    dispatch(setAppRequestStatusAC('loading'));
    packsAPI.updatePack(data)
        .then((res) => {
            dispatch(clearPacksList());
            dispatch(fetchPacks());
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message;
            dispatch(setAppErrorAC(error));
        })
        .finally(() => {
            dispatch(setAppRequestStatusAC('idle'));
        });
};

// types
type InitialStateType = typeof initialState

type setPacksListType = ReturnType<typeof setPacksList>
type clearPacksListType = ReturnType<typeof clearPacksList>

export type PacksReducerActionTypes = setPacksListType
    | clearPacksListType
