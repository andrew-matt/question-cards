import {AppThunk} from '../../../app/store';
import {setAppRequestStatusAC} from '../../../app/app-reducer';
import {GetPacksParamsType, packsAPI, ResponseCardPackType, UpdatePackParamsType} from './packs-api';
import {handleServerNetworkError} from '../../../utils/error-utils';

const initialState = {
    packsList: [] as ResponseCardPackType[],
    packsAmount: 0,
    currentPage: 1,
    packsPerPage: 5,
    requestedPacks: `User's` as RequestedPacksType,
};

export const packsReducer = (state: InitialStateType = initialState, action: PacksReducerActionTypes): InitialStateType => {
    switch (action.type) {
        case 'packs/SET-PACKS-LIST':
            return {...state, packsList: [...state.packsList, ...action.cardPacks]};
        case 'packs/CLEAR-PACKS-LIST':
            return {...state, packsList: []};
        case 'packs/SET-PACKS-AMOUNT':
            return {...state, packsAmount: action.packsAmount};
        case 'packs/SET-PACKS-PER-PAGE':
            return {...state, packsPerPage: action.packsPerPage};
        case 'packs/SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage};
        case 'packs/SET-REQUESTED-PACKS':
            return {...state, requestedPacks: action.requestedPacks};
        default: {
            return state;
        }
    }
};

//actions
export const setPacksList = (cardPacks: ResponseCardPackType[]) => ({type: 'packs/SET-PACKS-LIST', cardPacks} as const);
export const clearPacksList = () => ({type: 'packs/CLEAR-PACKS-LIST'} as const);
export const setPacksAmount = (packsAmount: number) => ({type: 'packs/SET-PACKS-AMOUNT', packsAmount} as const);
export const setPacksPerPage = (packsPerPage: number) => ({type: 'packs/SET-PACKS-PER-PAGE', packsPerPage} as const);
export const setCurrentPage = (currentPage: number) => ({type: 'packs/SET-CURRENT-PAGE', currentPage} as const);
export const setRequestedPacks = (requestedPacks: RequestedPacksType) => ({
    type: 'packs/SET-REQUESTED-PACKS',
    requestedPacks,
} as const);

//thunks
export const fetchPacks = (data: GetPacksParamsType = {}): AppThunk => async (dispatch) => {
    const {page, pageCount, user_id} = data;
    let response;
    try {
        dispatch(setAppRequestStatusAC('loading'));

        if (user_id) {
            response = await packsAPI.getPacks({page, pageCount, user_id});
        } else {
            response = await packsAPI.getPacks({page, pageCount});
        }

        dispatch(setPacksAmount(response.data.cardPacksTotalCount));
        dispatch(clearPacksList());
        dispatch(setPacksList(response.data.cardPacks));
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppRequestStatusAC('idle'));
    }
};

export const addPack = (requestedPacks: RequestedPacksType, pageCount: number, user_id: string): AppThunk => async (dispatch) => {
    const page = 1; // newPacks appear on the first page
    try {
        dispatch(setAppRequestStatusAC('loading'));
        await packsAPI.createPack();
        dispatch(setCurrentPage(page));
        if (requestedPacks === `User's`) {
            await dispatch(fetchPacks({page, pageCount, user_id}));
        } else {
            await dispatch(fetchPacks({page, pageCount}));
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppRequestStatusAC('idle'));
    }
};

export const removePack = (packID: string, requestedPacks: RequestedPacksType, data: GetPacksParamsType = {}): AppThunk => async (dispatch) => {
    const {page, pageCount, user_id} = data;
    try {
        dispatch(setAppRequestStatusAC('loading'));
        await packsAPI.deletePack(packID);
        if (requestedPacks === `User's`) {
            await dispatch(fetchPacks({page, pageCount, user_id}));
        } else {
            await dispatch(fetchPacks({page, pageCount}));
        }
    } catch (e) {
        handleServerNetworkError(e, dispatch);
    } finally {
        dispatch(setAppRequestStatusAC('idle'));
    }
};

export const changePack = (updateData: UpdatePackParamsType, requestedPacks: RequestedPacksType, data: GetPacksParamsType = {}): AppThunk => async (dispatch) => {
    const {page, pageCount, user_id} = data;
    try {
        dispatch(setAppRequestStatusAC('loading'));
        await packsAPI.updatePack(updateData);
        if (requestedPacks === `User's`) {
            await dispatch(fetchPacks({page, pageCount, user_id}));
        } else {
            await dispatch(fetchPacks({page, pageCount}));
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
type setPacksAmountType = ReturnType<typeof setPacksAmount>
type setPacksPerPageType = ReturnType<typeof setPacksPerPage>
type setCurrentPageType = ReturnType<typeof setCurrentPage>
type setRequestedPacksType = ReturnType<typeof setRequestedPacks>

export type PacksReducerActionTypes = setPacksListType
    | clearPacksListType
    | setPacksAmountType
    | setPacksPerPageType
    | setCurrentPageType
    | setRequestedPacksType

export type RequestedPacksType = `User's` | 'All'