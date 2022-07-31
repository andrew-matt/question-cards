import TableCell from '@mui/material/TableCell/TableCell';
import TableHead from '@mui/material/TableHead/TableHead';
import TableRow from '@mui/material/TableRow/TableRow';
import React from 'react';

type CardsTableColumnPropsType = {
   columns:ColumnType[]
}

type ColumnType = {
    field: string
    headerName: string
    width: number
}

export const CardsTableColumns:React.FC<CardsTableColumnPropsType> = (props) => {
    const {
        columns
    } = props
    return (
        <TableHead>
            <TableRow>
                {
                    columns.map((col) => {
                        return <TableCell width={col.width}>{col.headerName}</TableCell>
                    })
                }
            </TableRow>
        </TableHead>
    );
};
