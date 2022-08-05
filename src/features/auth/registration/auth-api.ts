import {instance} from '../../../common/instance/instance';

export const authAPI = {
    register(data: RegisterParamsType) {
        return instance.post('auth/register', data);
    },
    me() {
        return instance.post<AuthMeResponseType>('auth/me', {});
    },
};

export type RegisterParamsType = {
    email: string
    password: string
}

export type AuthMeResponseType = {
    avatar: string
    '_id': string
    'email': string
    'rememberMe': boolean
    'isAdmin': boolean
    'name': string
    'verified': boolean
    'publicCardPacksCount': number
    'created': string
    'updated': string
    '__v': number
    'token': string
    'tokenDeathTime': number
}