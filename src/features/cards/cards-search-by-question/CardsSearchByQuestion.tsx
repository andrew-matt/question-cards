import React, {ChangeEvent, useEffect, useState} from 'react';
import TextField from "@mui/material/TextField/TextField";
import {useDispatch} from "react-redux";
import {AddQueryParamsAC} from "../cards-reducer";
import {useDebounce} from "../useDebounce";


export const CardsSearchByQuestion: React.FC = () => {

    const [searchRequest, setSearchRequest] = useState('')
    const debouncedValue = useDebounce(searchRequest)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(AddQueryParamsAC({cardQuestion: debouncedValue}))
    },[debouncedValue, dispatch])

    const searchHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchRequest(e.currentTarget.value)
        // dispatch(AddQueryParamsAC({cardQuestion: e.currentTarget.value}))
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
