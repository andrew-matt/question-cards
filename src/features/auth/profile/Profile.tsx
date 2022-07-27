import style from './Profile.module.css'
import {Paper} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {useState} from "react";
import {EditNameInput} from "./EditNameInput";
import {SetNameTC} from "./profile-reducer";
import { ThunkDispatch } from 'redux-thunk';
import {AnyAction} from "redux";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export type DispatchType= ThunkDispatch<AppRootStateType, unknown, AnyAction>


export const Profile = () => {
    const userName= useSelector<AppRootStateType,string>(state => state.profile.name)
    const avatar= useSelector<AppRootStateType,string|undefined>(state => state.profile.avatar)
const [editMode,setEditMode]=useState<boolean>(false)
    const [name,setNewName]=useState<string>(userName)

    const dispatch=useDispatch<DispatchType>()

    const onEditIconHandler=()=>{
        setEditMode(true)
    }
    const onSaveNameHandler=()=>{
        setEditMode(false)
        dispatch(SetNameTC(name))
    }

    return (
        <div className={style.mainBlock}>
            <div className={style.back}>
             <span> <KeyboardBackspaceIcon style={{paddingTop:'5px'}}/>  Back to Pack List</span>
            </div>
            <Paper elevation={1} className={style.paper}>
                <span className={style.personalInfSpan}>Personal Information</span>
                <div className={style.imgBlock}>
                    <img    //checking for an avatar
                        src={avatar?avatar
                            :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU'}/>
                    <div><CameraAltIcon fontSize={'small'}/></div>
                </div>
                <div className={style.nameBlock}>
                    {editMode? <EditNameInput onClick={onSaveNameHandler} onChange={setNewName}/> //input and button component
                        : <span>{userName} <BorderColorIcon onClick={onEditIconHandler}
                            fontSize={'small'} style={{paddingTop:'5px'}}/></span>}
                    <span className={style.email}>email</span>
                </div>
                <button className={style.button}>
                    <LogoutIcon fontSize={'small'} style={{paddingRight: '5px'}}/> Log out
                </button>
            </Paper>
        </div>
    )
}