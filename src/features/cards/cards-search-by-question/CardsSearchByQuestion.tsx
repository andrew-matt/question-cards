import React, {ChangeEvent} from 'react';
import TextField from "@mui/material/TextField/TextField";
import {useDispatch} from "react-redux";
import {AddQueryParamsAC} from "../cards-reducer";


export const CardsSearchByQuestion: React.FC = () => {

    const dispatch = useDispatch()

    const searchHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(AddQueryParamsAC({cardQuestion: e.currentTarget.value}))
    }

    return (
        <TextField
            id="outlined-basic"
            label="Search by question"
            variant="outlined"
            onChange={searchHandler}
            style={{width: "100%", margin: "10px 0px"}}
        />
    );
};
