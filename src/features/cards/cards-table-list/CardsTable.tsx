import React, {useEffect} from 'react';
import Paper from "@mui/material/Paper/Paper";
import Table from "@mui/material/Table/Table";
import {CardsTableColumns} from "./CardsTableColumns";
import {CardsTableRows} from "./CardsTableRows";
import TableContainer from "@mui/material/TableContainer/TableContainer";
import { useSelector} from "react-redux";
import { AppRootStateType} from "../../../app/store";
import {CardType} from "../cards-api";



const CardsTable:React.FC = () => {

    const columns = [
        {field: 'question', headerName: 'Question', width: 150},
        {field: 'answer', headerName: 'Answer', width: 150},
        {field: 'lastUpdate', headerName: 'Last Updated', width: 30},
        {field: 'grade', headerName: 'Grade', width: 60},
    ]
    const rows = useSelector<AppRootStateType, CardType[]>((state) => state.cards.cards)

    return (
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="cards table list">
                    <CardsTableColumns columns={columns}/>
                    <CardsTableRows rows={rows}/>
                </Table>
            </TableContainer>
    );
};

export default CardsTable;