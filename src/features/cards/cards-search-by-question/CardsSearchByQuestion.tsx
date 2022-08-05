import React, {ChangeEvent, useEffect, useState} from 'react';
import TextField from "@mui/material/TextField/TextField";
import {AddQueryParamsAC} from "../cards-reducer";
import {useAppDispatch, useDebounce} from '../../../common/hooks/hooks';



export const CardsSearchByQuestion: React.FC = () => {

    const [searchRequest, setSearchRequest] = useState('')
    const debouncedValue = useDebounce(searchRequest)

    const dispatch = useAppDispatch()

    useEffect(() => {
        if (debouncedValue) dispatch(AddQueryParamsAC({cardQuestion: debouncedValue}))
    },[debouncedValue])

    const searchHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchRequest(e.currentTarget.value)
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
