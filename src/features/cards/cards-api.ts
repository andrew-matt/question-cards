import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials:true
})

export const cardsAPI = {
    getCards(idCardPack:string) {
        return instance.get<ResponseGetCardType>('/cards/card',{
            params: {
                cardsPack_id:idCardPack
            }
        })
    },
    createCard(data:RequestCreateCardType) {
        return instance.post('/cards/card',data)
    }
}

export type CardType = {
    "_id": string
    "cardsPack_id": string
    "user_id": string
    "answer": string
    "question": string
    "grade": number
    "shots": number
    "comments": string
    "type": string
    "rating": number
    "more_id": string
    "created": string
    "updated": string
    "__v": number
}

type ResponseGetCardType = {
    "cards":CardType[],
    "packUserId": string
    "page": number
    "pageCount": number
    "cardsTotalCount": number
    "minGrade": number
    "maxGrade": number
    "token": string
    "tokenDeathTime": number
}

export type RequestCreateCardType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
    }
}