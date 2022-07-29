import {EditNameInput} from "./EditNameInput";
import BorderColorIcon from "@mui/icons-material/BorderColor";

type PropsType={
    editMode:boolean,
    name:string,
    onSaveNameHandler:()=>void,
    setNewName:(name:string)=>void
    onEditIconHandler:()=>void
}

export const EditableSpan=(props:PropsType)=>{
    return(
        <div style={{display:'flex', justifyContent:'center'}}>
            {props.editMode? <EditNameInput onClick={props.onSaveNameHandler} onChange={props.setNewName}/> //input and button component
                : <span>
                            {props.name}
                    <BorderColorIcon onClick={props.onEditIconHandler} fontSize={'small'} style={{paddingTop:'5px'}}/>
                    </span>}
        </div>
    )
}