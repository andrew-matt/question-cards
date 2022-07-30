import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
});

export const packsAPI = {
    getPacks() {
        return instance.get<GetPacksResponseType>('cards/pack');
    },
    createPack() {
        return instance.post('cards/pack', {cardsPack: {name: 'Pack 1', deckCover: 'some url', private: false}});
    },
};

// types
export type ResponseCardPackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    deckCover: string | null
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
}

type GetPacksResponseType = {
    cardPacks: ResponseCardPackType[],
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}
