import Paper from '@mui/material/Paper/Paper';
import Table from '@mui/material/Table/Table';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import React, {useEffect} from 'react';
import {CardsTableColumns} from './CardsTableColumns';
import {CardsTableRows} from "./CardsTableRows";
import {useDispatch, useSelector} from "react-redux";
import {getCards} from "../cards-reducer";
import {AppDispatch, AppRootStateType} from "../../../app/store";
import {CardType} from "../cards-api";
import {initializedAppTC} from "../../../app/app-reducer";
import {setIsLoggedInAC} from "../../auth/login/login-reducer";
import {useNavigate} from "react-router-dom";

export const CardsTable = () => {
    const rows = useSelector<AppRootStateType, CardType[]>((state) => state.cards.cards)
    useEffect(() => {
            dispatch(getCards('60d1ddb747b8860004376933'))
    },[])

    const dispatch:AppDispatch = useDispatch()



    const columns = [
        {field: 'question', headerName: 'Question', width: 150},
        {field: 'answer', headerName: 'Answer', width: 150},
        {field: 'lastUpdate', headerName: 'Last Updated', width: 30},
        {field: 'grade', headerName: 'Grade', width: 60},
    ]

    // const rows = [
    //     {
    //         question: `How "This" works in JavaScript?`,
    //         answer: `This is how "This" works in JavaScript`,
    //         Last: 'yesterday',
    //         grade: 5
    //     },
    // ]


    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="cards table list">
                <CardsTableColumns columns={columns}/>
                <CardsTableRows rows={rows}/>
            </Table>
        </TableContainer>
    );
};
