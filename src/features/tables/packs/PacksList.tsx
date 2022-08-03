import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
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
    setPacksPerPage,
    setRequestedPacks,
} from './packs-reducer';
import {IconButton, TablePagination, TextField} from '@mui/material';
import {Delete, Edit, School} from '@mui/icons-material';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import {NavLink} from 'react-router-dom';

type PropsType={
    searchedPackList:ResponseCardPackType[],
    cardNumber:number[],
    min:number,
    max:number
}

export const PacksList = (props:PropsType) => {
const {max,min}=props

    const [editMode, setEditMode] = useState(false);
    const [changedPackID, setChangedPackID] = useState('');
    const [changedPackValue, setChangedPackValue] = useState('');

    //const packs = useAppSelector<ResponseCardPackType[]>(state => state.packs.packsList);
    const packsAmount = useAppSelector<number>(state => state.packs.packsAmount);
    const page = useAppSelector<number>(state => state.packs.currentPage);
    const pageCount = useAppSelector<number>(state => state.packs.packsPerPage);
    const user_id = useAppSelector<string>(state => state.profile.UserData._id);
    const requestedPacks = useAppSelector<RequestedPacksType>(state => state.packs.requestedPacks);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchPacks({page, pageCount, user_id}));
        return () => {
            dispatch(setRequestedPacks(`User's`));
            dispatch(setCurrentPage(1));
            dispatch(clearPacksList());
        };
    }, []);

    const onPageChangeHandler = (event: unknown, newPage: number) => {
        const page = newPage + 1 // initially newPage value is equal to currentPage value
        dispatch(setCurrentPage(page));
        if (requestedPacks === `User's`) {
            dispatch(fetchPacks({page, pageCount, user_id, min, max}));
        } else {
            dispatch(fetchPacks({page, pageCount, min, max}));
        }
    };

    const onPacksPerPageChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const pageCount = +e.target.value;
        dispatch(setPacksPerPage(pageCount));
        if (requestedPacks === `User's`) {
            dispatch(fetchPacks({page, pageCount, user_id,min,max}));
        } else {
            dispatch(fetchPacks({page, pageCount,min,max}));
        }
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
                    {props.searchedPackList.map((pack) => {
                        const date = new Date(pack.updated);
                        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                        const packChange = () => {
                            setEditMode(false);

                            if (changedPackValue.trim() !== '' && changedPackValue.trim() !== pack.name) {
                                dispatch(changePack({_id: pack._id, name: changedPackValue}, requestedPacks, {page, pageCount, user_id}));
                            }
                        };

                        const onPackChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            setChangedPackValue(e.currentTarget.value);
                        };

                        const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') packChange();
                        };

                        const onDeleteButtonClickHandler = () => {
                            dispatch(removePack(pack._id, requestedPacks, {page, pageCount, user_id}));
                        };

                        const onEditButtonClickHandler = () => {
                            setEditMode(true);
                            setChangedPackValue(pack.name);
                            setChangedPackID(pack._id);
                        };

                        const setCurrentPackNameHandler = () => {
                            dispatch(setCurrentPackName(pack.name))
                        }

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
                                    style={{textDecoration:"none"}}
                                    to={`/cards/${pack._id}`}
                                    onClick={setCurrentPackNameHandler}
                                >
                                    {pack.name}
                                </NavLink>
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
                count={packsAmount}
                rowsPerPage={pageCount}
                page={page - 1} // TablePagination component requires the first page to start with number 0
                onPageChange={onPageChangeHandler}
                onRowsPerPageChange={onPacksPerPageChangeHandler}
            />
        </TableContainer>
    );
};
