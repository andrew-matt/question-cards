import TableCell from '@mui/material/TableCell/TableCell';
import TableHead from '@mui/material/TableHead/TableHead';
import TableRow from '@mui/material/TableRow/TableRow';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AddQueryParamsAC, clearSortParamsAC, setSortParamsAC, SortParamsType} from "../cards-reducer";
import {AppRootStateType} from "../../../app/store";
import style from './CardsTable.module.css'
import {ArrowDownward, ArrowUpward, Delete} from "@mui/icons-material";
import {IconButton} from "@mui/material";

type CardsTableColumnPropsType = {
    columns: ColumnType[]
}

type ColumnType = {
    field: string
    headerName: string
    width: number
}

export const CardsTableColumns: React.FC<CardsTableColumnPropsType> = (props) => {
    const {
        columns
    } = props

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(clearSortParamsAC())
        }
    }, [dispatch])

    const sortParams = useSelector<AppRootStateType, SortParamsType>(state => state.cards.sortParams)

    const sortClickHandler = (field: string) => {
        if (sortParams.field === field) {
            if (sortParams.sort === '0') {
                dispatch(setSortParamsAC({sort: '1', field}))
                dispatch(AddQueryParamsAC({sortCards: `1${field}`}))
            } else {
                dispatch(setSortParamsAC({sort: '0', field}))
                dispatch(AddQueryParamsAC({sortCards: `0${field}`}))
            }
        } else {
            dispatch(setSortParamsAC({sort: '1', field}))
            dispatch(AddQueryParamsAC({sortCards: `1${field}`}))
        }
    }

    const showIconsBySortParams = (field: string) => {
        if (sortParams.field === field) {
            if (sortParams.sort === '1') {
                return (
                    <IconButton>
                        <ArrowUpward/>
                    </IconButton>
                )
            }
            if (sortParams.sort === '0') {
                return (
                    <IconButton>
                        <ArrowDownward/>
                    </IconButton>
                )
            }
        }
    }

    return (
        <TableHead>
            <TableRow>
                {
                    columns.map((col) => {
                        return <TableCell
                            className={style.column}
                            key={col.headerName + Math.random()}
                            width={col.width}
                            onClick={() => sortClickHandler(col.field)}
                        >
                            {col.headerName}
                            {showIconsBySortParams(col.field)}
                        </TableCell>
                    })
                }
            </TableRow>
        </TableHead>
    );
};
