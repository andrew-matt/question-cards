import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
});

export const authAPI = {
    register(data: RegisterParamsType) {
        return instance.post('auth/register', data);
    },
    me() {
        return instance.post<AuthMeResponseType>('auth/me',{})
    }
};

export type RegisterParamsType = {
    email: string
    password: string
}

export type AuthMeResponseType = {
    avatar:string
    "_id": string
    "email": string
    "rememberMe": boolean
    "isAdmin": boolean
    "name": string
    "verified": boolean
    "publicCardPacksCount": number
    "created": string
    "updated": string
    "__v": number
    "token": string
    "tokenDeathTime": number
}