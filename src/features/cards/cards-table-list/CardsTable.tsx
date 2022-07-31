import Paper from '@mui/material/Paper/Paper';
import Table from '@mui/material/Table/Table';
import TableContainer from '@mui/material/TableContainer/TableContainer';
import React from 'react';
import {CardsTableColumns} from './CardsTableColumns';
import {CardsTableRows} from "./CardsTableRows";

export const CardsTable = () => {

    const columns = [
        {field: 'question', headerName: 'Question', width: 150},
        {field: 'question', headerName: 'Answer', width: 150},
        {field: 'question', headerName: 'Last Updated', width: 30},
        {field: 'question', headerName: 'Grade', width: 60},
    ]
    const rows = [
        {
            question: `How "This" works in JavaScript?`,
            answer: `This is how "This" works in JavaScript`,
            Last: 'yesterday',
            grade: 5
        },
    ]
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="cards table list">
                <CardsTableColumns columns={columns}/>
                <CardsTableRows rows={rows}/>
            </Table>
        </TableContainer>
    );
};
