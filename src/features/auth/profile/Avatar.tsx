import style from "./Profile.module.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {ChangeEvent} from "react";

type PropsType={
    avatar:string|null
    setNewPhoto:(avatar:any)=>void
}

export const Avatar=(props:PropsType)=>{

    const onChangeHandle=(e:ChangeEvent<HTMLInputElement>)=>{

        if (e.target.files) props.setNewPhoto(e.target.files[0])
    }

    return(
        <div className={style.imgBlock}>
            <img    //checking for an avatar
                src={props.avatar?props.avatar
                    :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU'}/>
            <div>
                <label>
                <CameraAltIcon fontSize={'small'}/>
                    <input type={'file'} hidden onChange={onChangeHandle}/>
                </label>
                </div>
        </div>
    )
}