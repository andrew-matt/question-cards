import {cardsAPI, CardType, RequestCreateCardType, RequestUpdateCardType, ResponseGetCardType} from "./cards-api";
import {AppThunk} from "../../app/store";
import {AxiosError} from "axios";
import {setAppErrorAC, setAppRequestStatusAC} from "../../app/app-reducer";

const GET_CARDS = "CARDS-REDUCER/GET-CARDS"
const CLEAR_CARDS_LIST = "CARDS-REDUCER/CLEAR_CARDS_LIST"

const initialState = {
    "cards": [] as CardType[],
    "packUserId": "",
    "page": 0,
    "pageCount": 0,
    "cardsTotalCount": 0,
    "minGrade": 0,
    "maxGrade": 0,
    "token": "",
    "tokenDeathTime": 0,
}

type InitialStateType = typeof initialState

export const cardsReducer = (state: InitialStateType = initialState, action: ActionsCardsReducer): InitialStateType => {
    switch (action.type) {
        case GET_CARDS:
            return {...state, ...action.data}
        case CLEAR_CARDS_LIST:
            return {...state, cards: []}
        default:
            return state
    }
}

export type ActionsCardsReducer = setCardsACType
    | ClearCardsListACType
//ACTIONS
export const setCardsAC = (data: ResponseGetCardType) => ({type: GET_CARDS, data} as const)
export type setCardsACType = ReturnType<typeof setCardsAC>

export const ClearCardsListAC = () => ({type: CLEAR_CARDS_LIST} as const)
export type ClearCardsListACType = ReturnType<typeof ClearCardsListAC>

//THUNKS

export const getCards = (idCardsPack: string): AppThunk => (dispatch) => {
    dispatch(setAppRequestStatusAC('loading'))
    cardsAPI.getCards(idCardsPack)
        .then((res) => {
            dispatch(setCardsAC(res.data))
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

export const addCard = (data: RequestCreateCardType): AppThunk => (dispatch) => {
    dispatch(setAppRequestStatusAC('loading'))
    cardsAPI.createCard(data)
        .then((res) => {
            return res
        })
        .then((res) => {
            dispatch(getCards(data.card.cardsPack_id))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            dispatch(setAppErrorAC(error))
            dispatch(setAppRequestStatusAC('failed'))
        })

}

export const deleteCard = (cardID: string, cardsPackID: string): AppThunk => (dispatch) => {
    dispatch(setAppRequestStatusAC('loading'))
    cardsAPI.deleteCard(cardID)
        .then((res) => {
            return res
        })
        .then((res) => {
            dispatch(getCards(cardsPackID))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            dispatch(setAppErrorAC(error))
            dispatch(setAppRequestStatusAC('failed'))
        })
}

export const updateCard = (cardID: string, cardsPackID: string): AppThunk => (dispatch) => {
    dispatch(setAppRequestStatusAC('loading'))
    cardsAPI.updateCard({
        card: {
            _id: cardID,
            question: "new question",
            answer: "new answer"
        }
    })
        .then((res) => {
            return res
        })
        .then((res) => {
            dispatch(getCards(cardsPackID))
        })
        .catch((err: AxiosError<{ error: string }>) => {
            const error = err.response
                ? err.response.data.error
                : err.message
            dispatch(setAppErrorAC(error))
            dispatch(setAppRequestStatusAC('failed'))
        })
}