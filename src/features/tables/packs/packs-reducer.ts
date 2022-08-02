import {AppThunk} from '../../../app/store';
import {setAppRequestStatusAC} from '../../../app/app-reducer';
import {packsAPI, ResponseCardPackType, UpdatePackParamsType} from './packs-api';
import {handleServerNetworkError} from '../../../utils/error-utils';

const _initialState: ResponseCardPackType[] = [];
const initialState = {
    packsList: [] as ResponseCardPackType[],
    requestedPacks: `User's` as RequestedPacksType,
    nameOfCurrentPack:""
};

export const packsReducer = (state: InitialStateType = initialState, action: PacksReducerActionTypes): InitialStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS-LIST':
            return {...state, packsList: [...state.packsList, ...action.cardPacks]};
        // return [...state, ...action.cardPacks];
        case 'packs/CLEAR-PACKS-LIST':
            return {...state, packsList: []};
        // return [];
        case 'packs/SET-REQUESTED-PACKS':
            return {...state, requestedPacks: action.requestedPacks};
        case "packs/SET-CURRENT-PACK-NAME":
            return {...state, nameOfCurrentPack:action.name}
        default: {
            return state;
        }
    }
};

//actions
export const setPacksList = (cardPacks: ResponseCardPackType[]) => ({type: 'packs/SET-PACKS-LIST', cardPacks} as const);
export const clearPacksList = () => ({type: 'packs/CLEAR-PACKS-LIST'} as const);
export const setRequestedPacks = (requestedPacks: RequestedPacksType) => ({
    type: 'packs/SET-REQUESTED-PACKS',
    requestedPacks,
} as const);
export const setCurrentPackName = (name:string) => ({type: 'packs/SET-CURRENT-PACK-NAME',name} as const);


//thunks
export const fetchUserPacks = (user_id: string): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppRequestStatusAC('loading'));
        const response = await packsAPI.getPacks({user_id});
        const pageCount = response.data.cardPacksTotalCount;

        const res = await packsAPI.getPacks({pageCount, user_id});
        dispatch(clearPacksList());
        dispatch(setPacksList(res.data.cardPacks));
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppRequestStatusAC('idle'));
    }
};

export const fetchAllPacks = (): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppRequestStatusAC('loading'));
        const response = await packsAPI.getPacks();
        const pageCount = response.data.cardPacksTotalCount;

        const res = await packsAPI.getPacks({pageCount});
        dispatch(clearPacksList());
        dispatch(setPacksList(res.data.cardPacks));
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppRequestStatusAC('idle'));
    }
};

export const addPack = (user_id: string, requestedPacks: RequestedPacksType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppRequestStatusAC('loading'));
        await packsAPI.createPack();
        if (requestedPacks === `User's`) {
            await dispatch(fetchUserPacks(user_id));
        } else {
            await dispatch(fetchAllPacks());
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppRequestStatusAC('idle'));
    }
};

export const removePack = (packID: string, user_id: string, requestedPacks: RequestedPacksType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppRequestStatusAC('loading'));
        await packsAPI.deletePack(packID);
        if (requestedPacks === `User's`) {
            await dispatch(fetchUserPacks(user_id));
        } else {
            await dispatch(fetchAllPacks());
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppRequestStatusAC('idle'));
    }
};

export const changePack = (data: UpdatePackParamsType, user_id: string, requestedPacks: RequestedPacksType): AppThunk => async (dispatch) => {
    try {
        dispatch(setAppRequestStatusAC('loading'));
        await packsAPI.updatePack(data);
        if (requestedPacks === `User's`) {
            await dispatch(fetchUserPacks(user_id));
        } else {
            await dispatch(fetchAllPacks());
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppRequestStatusAC('idle'));
    }
};

// types
type InitialStateType = typeof initialState

type setPacksListType = ReturnType<typeof setPacksList>
type clearPacksListType = ReturnType<typeof clearPacksList>
type setRequestedPacksType = ReturnType<typeof setRequestedPacks>
type  setCurrentNamePackType = ReturnType<typeof setCurrentPackName>

export type PacksReducerActionTypes = setPacksListType
    | clearPacksListType
    | setRequestedPacksType
| setCurrentNamePackType

export type RequestedPacksType = `User's` | 'All'