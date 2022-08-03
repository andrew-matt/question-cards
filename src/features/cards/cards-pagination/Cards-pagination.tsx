import TablePagination from '@mui/material/TablePagination/TablePagination';
import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {AddQueryParamsAC} from "../cards-reducer";
import {getCardQueryParams} from "../cards-api";

export const CardsPagination = () => {
    const dispatch = useDispatch()

    const queryParams = useSelector<AppRootStateType, getCardQueryParams>(state => state.cards.queryParams)
    const totalCardsCount = useSelector<AppRootStateType, number>(state => state.cards.cardsTotalCount)
    const pageCount = useSelector<AppRootStateType, number>(state => state.cards.queryParams.pageCount || 5)
    const page = useSelector<AppRootStateType, number>(state => state.cards.queryParams.page || 0)

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        dispatch(AddQueryParamsAC({...queryParams, page: newPage + 1}))
    };

    const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(AddQueryParamsAC({...queryParams, pageCount: +e.target.value}))
    }

    return (
        <TablePagination
            component="div"
            count={totalCardsCount}
            rowsPerPageOptions={[5, 10, 25]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPage={pageCount}
            page={page - 1}
            onPageChange={handleChangePage}
        />
    );
};