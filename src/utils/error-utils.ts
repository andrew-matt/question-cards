import {setAppErrorAC} from '../app/app-reducer';
import axios, {AxiosError} from 'axios';
import {AppDispatch} from '../app/store';

export const handleServerNetworkError = (e: unknown, dispatch: AppDispatch) => {
    const err = e as Error | AxiosError<{ error: string }>;
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message;
        dispatch(setAppErrorAC(error));
    } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`));
    }
};
