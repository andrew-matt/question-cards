import TableBody from '@mui/material/TableBody/TableBody';
import TableCell from '@mui/material/TableCell/TableCell';
import TableRow from '@mui/material/TableRow/TableRow';
import React from 'react';

type CardsTableRowsPropsType = {
    rows:CardType[]
}

type CardType = {
    question:string
    answer: string
    Last: string
    grade:number
}

export const CardsTableRows:React.FC<CardsTableRowsPropsType> = (props) => {
    const {
        rows
    } = props
    return (
        <TableBody>
            {rows.map((row) => (
                <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                        {row.question}
                    </TableCell>
                    <TableCell >{row.answer}</TableCell>
                    <TableCell >{row.Last}</TableCell>
                    <TableCell >{row.grade}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};
