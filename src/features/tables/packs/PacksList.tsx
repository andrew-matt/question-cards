import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ResponseCardPackType} from './packs-api';
import {
    changePack,
    clearPacksList,
    fetchPacks,
    removePack,
    RequestedPacksType,
    setCurrentPackName,
    setCurrentPage,
    setPacksPerPage, setPacksSortBy, setPacksSortOrder,
    setRequestedPacks,
} from './packs-reducer';
import {Box, IconButton, TablePagination, TextField} from '@mui/material';
import {Delete, Edit, School} from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import {NavLink} from 'react-router-dom';
import {getComparator, Order, stableSort} from '../../../utils/sort-utils';
import {EnhancedTableHead} from '../../../common/enhancedTableHead/EnhancedTableHead';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

type PropsType = {
    searchedPackList: ResponseCardPackType[],
    cardNumber: number[],
    min: number,
    max: number
}

export const PacksList = (props: PropsType) => {
    const {max, min} = props;

    const [orderBy, setOrderBy] = React.useState<keyof ResponseCardPackType>('updated');
    const [dense, setDense] = React.useState(false);

    const [editMode, setEditMode] = useState(false);
    const [changedPackID, setChangedPackID] = useState('');
    const [changedPackValue, setChangedPackValue] = useState('');

    const packsAmount = useAppSelector<number>(state => state.packs.packsAmount);
    const page = useAppSelector<number>(state => state.packs.currentPage);
    const pageCount = useAppSelector<number>(state => state.packs.packsPerPage);
    const user_id = useAppSelector<string>(state => state.profile.UserData._id);
    const requestedPacks = useAppSelector<RequestedPacksType>(state => state.packs.requestedPacks);
    const sortPacks = useAppSelector<string>(state => state.packs.sortBy);
    const order = useAppSelector<Order>(state => state.packs.sortOrder);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPacks(queryParams, requestedPacks));
        return () => {
            dispatch(setRequestedPacks(`User's`));
            dispatch(setCurrentPage(1));
            dispatch(clearPacksList());
        };
    }, []);

    const queryParams = {page, pageCount, user_id, min, max, sortPacks};

    const onPageChangeHandler = (event: unknown, newPage: number) => {
        const page = newPage + 1; // initially newPage value is equal to currentPage value
        dispatch(setCurrentPage(page));
        dispatch(fetchPacks({...queryParams, page}, requestedPacks));
    };

    const onPacksPerPageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const pageCount = +e.target.value;
        dispatch(setPacksPerPage(pageCount));
        dispatch(fetchPacks({...queryParams, pageCount}, requestedPacks));
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof ResponseCardPackType,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        const sortPacks = `${isAsc ? 0 : 1}${property}`;
        dispatch(setPacksSortOrder(isAsc ? 'desc' : 'asc'));
        setOrderBy(property);
        dispatch(setPacksSortBy(sortPacks));
        dispatch(fetchPacks({...queryParams, sortPacks}, requestedPacks));
    };

    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableContainer>
                    <Table size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(props.searchedPackList, getComparator(order, orderBy))
                                .map((pack) => {

                                    const date = new Date(pack.updated);
                                    const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                                    const packChange = () => {
                                        setEditMode(false);

                                        if (changedPackValue.trim() !== '' && changedPackValue.trim() !== pack.name) {
                                            dispatch(changePack({
                                                _id: pack._id,
                                                name: changedPackValue,
                                            }, requestedPacks, {
                                                page,
                                                pageCount,
                                                user_id,
                                            }));
                                        }
                                    };

                                    const onPackChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                        setChangedPackValue(e.currentTarget.value);
                                    };

                                    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
                                        if (e.key === 'Enter') packChange();
                                    };

                                    const onDeleteButtonClickHandler = () => {
                                        dispatch(removePack(pack._id, requestedPacks, queryParams));
                                    };

                                    const onEditButtonClickHandler = () => {
                                        setEditMode(true);
                                        setChangedPackValue(pack.name);
                                        setChangedPackID(pack._id);
                                    };

                                    const setCurrentPackNameHandler = () => {
                                        dispatch(setCurrentPackName(pack.name));
                                    };

                                    const activateEditMode = () => {
                                        if (editMode && changedPackID === pack._id) {
                                            return (
                                                <TextField
                                                    value={changedPackValue}
                                                    autoFocus
                                                    onBlur={packChange}
                                                    onKeyUp={onKeyUpHandler}
                                                    onChange={onPackChangeHandler}
                                                    size={'small'}
                                                />
                                            );
                                        } else {
                                            return <NavLink
                                                style={{textDecoration: 'none'}}
                                                to={`/cards/${pack._id}`}
                                                onClick={setCurrentPackNameHandler}
                                            >
                                                {pack.name}
                                            </NavLink>;
                                        }
                                    };

                                    const showUserPackButtons = () => {
                                        if (user_id === pack.user_id) {
                                            return (
                                                <>
                                                    <IconButton onClick={onDeleteButtonClickHandler}>
                                                        <Delete/>
                                                    </IconButton>
                                                    <IconButton onClick={onEditButtonClickHandler}>
                                                        <Edit/>
                                                    </IconButton>
                                                </>
                                            );
                                        }
                                    };

                                    const align = 'left';

                                    return (
                                        <TableRow key={pack._id}>
                                            <TableCell component="th" scope="row">
                                                {activateEditMode()}
                                            </TableCell>
                                            <TableCell align={align}>{pack.cardsCount}</TableCell>
                                            <TableCell align={align}>{formattedDate}</TableCell>
                                            <TableCell align={align}>{pack.user_name}</TableCell>
                                            <TableCell align={align}>
                                                <IconButton disabled={true}>
                                                    <School/>
                                                </IconButton>
                                                {showUserPackButtons()}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    labelRowsPerPage={'Packs per page'}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={packsAmount}
                    rowsPerPage={pageCount}
                    page={page - 1} // TablePagination component requires the first page to start with number 0
                    onPageChange={onPageChangeHandler}
                    onRowsPerPageChange={onPacksPerPageChangeHandler}
                    showFirstButton
                    showLastButton
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense}/>}
                label="Dense padding"
            />
        </Box>
    );
};
