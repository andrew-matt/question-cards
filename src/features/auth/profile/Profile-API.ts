import {instance} from '../../../common/instance/instance';

export const ProfileAPI = {
    changeNameOrAvatar: (name: string, avatar: any) => {
        return instance.put(`auth/me`, {name: name, avatar: avatar});
    },
};