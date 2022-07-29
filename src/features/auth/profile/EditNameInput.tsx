import {ChangeEvent} from "react";

type PropsType={
    onClick:()=>void
    onChange:(name:string)=>void
}

export const EditNameInput=(props:PropsType)=>{
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.onChange(e.currentTarget.value)

    return(
        <div>
            <input onChange={onChangeHandler} style={{width:'160px'}}/>
            <button onClick={props.onClick}>save</button>
        </div>
    )
}