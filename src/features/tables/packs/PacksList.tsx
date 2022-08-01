import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from '../../../app/store';
import {ResponseCardPackType} from './packs-api';
import {
    changePack,
    clearPacksList,
    fetchUserPacks,
    removePack,
    RequestedPacksType,
    setRequestedPacks,
} from './packs-reducer';
import {IconButton, TablePagination, TextField} from '@mui/material';
import {Delete, Edit, School} from '@mui/icons-material';
import {CardsTable} from "../../cards/cards-table-list/CardsTable";
import {NavLink} from "react-router-dom";

export const PacksList = () => {

    const [editMode, setEditMode] = useState(false);
    const [changedPackID, setChangedPackID] = useState('');
    const [changedPackValue, setChangedPackValue] = useState('');
    const [packsPerPage, setPacksPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const allPacks = useSelector<AppRootStateType, ResponseCardPackType[]>(state => state.packs.packsList);
    const userID = useSelector<AppRootStateType, string>(state => state.profile.UserData._id);
    const requestedPacks = useSelector<AppRootStateType, RequestedPacksType>(state => state.packs.requestedPacks);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUserPacks(userID));
        return () => {
            dispatch(setRequestedPacks(`User's`));
            dispatch(clearPacksList());
        };
    }, [dispatch]);

    const packs = allPacks.slice(page * packsPerPage, page * packsPerPage + packsPerPage);

    const onPageChangeHandler = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const onRowsPerPageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPacksPerPage(+e.target.value);
    };

    const tableHeader = {fontWeight: 'bold', width: '20%'};
    const align = 'center';

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={tableHeader}>Name</TableCell>
                        <TableCell align={align} style={tableHeader}>Cards count</TableCell>
                        <TableCell align={align} style={tableHeader}>Update</TableCell>
                        <TableCell align={align} style={tableHeader}>Author name</TableCell>
                        <TableCell align={align} style={tableHeader}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packs.map((pack) => {
                        const date = new Date(pack.updated);
                        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                        const packChange = () => {
                            setEditMode(false);

                            if (changedPackValue.trim() !== '' && changedPackValue.trim() !== pack.name) {
                                dispatch(changePack({_id: pack._id, name: changedPackValue}, userID, requestedPacks));
                            }
                        };

                        const onPackChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            setChangedPackValue(e.currentTarget.value);
                        };

                        const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') packChange();
                        };

                        const onDeleteButtonClickHandler = () => {
                            dispatch(removePack(pack._id, userID, requestedPacks));
                        };

                        const onEditButtonClickHandler = () => {
                            setEditMode(true);
                            setChangedPackValue(pack.name);
                            setChangedPackID(pack._id);
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
                                return pack.name;
                            }
                        };

                        const showUserPackButtons = () => {
                            if (userID === pack.user_id) {
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
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={allPacks.length}
                rowsPerPage={packsPerPage}
                page={page}
                onPageChange={onPageChangeHandler}
                onRowsPerPageChange={onRowsPerPageChangeHandler}
            />
        </TableContainer>
    );
};
