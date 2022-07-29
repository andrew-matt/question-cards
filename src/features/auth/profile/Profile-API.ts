import axios from "axios"

const instance= axios.create({
    withCredentials:true,
     baseURL:'http://localhost:7542/2.0/',
    // headers: {
    //     "API-KEY": "bb4d8d53-c64d-4047-9be6-a6b7671d5984"
    // }
})

export const ProfileAPI = {
    changeName: (name: string) => {
        return instance.put(`auth/me` , {name:name, avatar:''})
    }
}