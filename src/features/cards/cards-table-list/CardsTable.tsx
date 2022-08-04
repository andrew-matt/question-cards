import React from 'react';
import Paper from "@mui/material/Paper/Paper";
import Table from "@mui/material/Table/Table";
import {CardsTableColumns} from "./CardsTableColumns";
import {CardsTableRows} from "./CardsTableRows";
import TableContainer from "@mui/material/TableContainer/TableContainer";

import {useAppSelector} from "../../../common/hooks/hooks";
import { NoAvailableCardsMessage } from '../cards-utils/NoAvailableCardsMessage';

const CardsTable: React.FC = () => {

    const columns = [
        {field: 'question', headerName: 'Question', width: 400},
        {field: 'answer', headerName: 'Answer', width: 400},
        {field: 'updated', headerName: 'Last Updated', width: 200},
        {field: 'grade', headerName: 'Grade', width: 200},
    ]
    const rows = useAppSelector((state) => state.cards.cards)

    const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="cards table list">
                    <CardsTableColumns columns={columns}/>
                    <CardsTableRows rows={rows}/>
                </Table>
            </TableContainer>
            {
                cardsTotalCount === 0 ? <NoAvailableCardsMessage/> : null
            }
        </>


    )
        ;
};

export default CardsTable;