import {cardsAPI, CardType} from "./cards-api";
import {AppThunk} from "../../app/store";
import {AxiosError} from "axios";
import {setAppErrorAC, setAppRequestStatusAC} from "../../app/app-reducer";

const GET_CARDS = "CARDS-REDUCER/GET-CARDS"

const initialState = {
    cards: [] as CardType[]
}

type InitialStateType = typeof initialState

export const cardsReducer = (state:InitialStateType = initialState, action:ActionsCardsReducer):InitialStateType => {
    switch (action.type) {
        case GET_CARDS:
            return {...state, cards: action.cards}
        default:
            return state
    }
}

export type ActionsCardsReducer = setCardsACType
//ACTIONS
export const setCardsAC = (cards:CardType[]) => ({type:GET_CARDS,cards} as const)
export type setCardsACType = ReturnType<typeof setCardsAC>

//THUNKS

export const getCards = (idCardsPack:string):AppThunk => (dispatch) => {
    dispatch(setAppRequestStatusAC('loading'))
    cardsAPI.getCards(idCardsPack)
        .then((res) => {
            dispatch(setCardsAC(res.data.cards))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            dispatch(setAppErrorAC(error))
        })
        .finally(() => {
            dispatch(setAppRequestStatusAC('idle'))
        })
}