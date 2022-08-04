import TablePagination from '@mui/material/TablePagination/TablePagination';
import React from 'react';
import {AddQueryParamsAC} from "../cards-reducer";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";

export const CardsPagination = () => {
    const dispatch = useAppDispatch()

    const queryParams = useAppSelector(state => state.cards.queryParams)
    const totalCardsCount = useAppSelector(state => state.cards.cardsTotalCount)
    const pageCount = useAppSelector(state => state.cards.queryParams.pageCount || 5)
    const page = useAppSelector(state => state.cards.queryParams.page || 0)

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