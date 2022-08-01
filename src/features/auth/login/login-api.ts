import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const loginAPI = {
    login(data:LoginParamsType) {
        return instance.post<ResponseLoginType>('auth/login', data)
    },
    logout() {
        return instance.delete('auth/me')
    },
    //"forgot password" uses another url, thus such a strange request
    forgotPassword(email:string) {
        return axios.post<ResponseForgotPasswordType>(
            'https://neko-back.herokuapp.com/2.0/auth/forgot',
            {
                email,
                from:"admin",
                message:`<div style='background-color: lime; padding: 15px'>password recovery link: <a href='http://localhost:3000/#/password-new/$token$'>link</a></div>`},
            {
                withCredentials:true
            })
    },
    setNewPassword(password:string, resetPasswordToken:string) {
        return instance.post('/auth/set-new-password',{password,resetPasswordToken})
    }

}

export type LoginParamsType = {
    "email":string
    "password":string
    "rememberMe":boolean
}

type ResponseLoginType = {
    "avatar":string
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

type ResponseForgotPasswordType = {
    "info": string
    "success": boolean
    "answer": boolean
    "html": boolean
}