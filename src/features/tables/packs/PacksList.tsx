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
import {changePack, clearPacksList, fetchPacks, removePack} from './packs-reducer';
import {IconButton, TextField} from '@mui/material';
import {Delete, Edit, School} from '@mui/icons-material';
import {CardsTable} from "../../cards/cards-table-list/CardsTable";
import {NavLink} from "react-router-dom";

export const PacksList = () => {

    const [editMode, setEditMode] = useState(false);
    const [changedPackID, setChangedPackID] = useState('');
    const [changedPackValue, setChangedPackValue] = useState('');

    const packs = useSelector<AppRootStateType, ResponseCardPackType[]>(state => state.packs);
    const userID = useSelector<AppRootStateType>(state => state.profile.UserData._id);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPacks());
        return () => {
            dispatch(clearPacksList());
        };
    }, [dispatch]);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontWeight: 'bold'}}>Name</TableCell>
                        <TableCell align="center" style={{fontWeight: 'bold'}}>Cards count</TableCell>
                        <TableCell align="center" style={{fontWeight: 'bold'}}>Update</TableCell>
                        <TableCell align="center" style={{fontWeight: 'bold'}}>Author name</TableCell>
                        <TableCell align="center" style={{fontWeight: 'bold'}}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packs.map((pack) => {
                        const date = new Date(pack.updated);
                        const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

                        const packChange = () => {
                            setEditMode(false);

                            if (changedPackValue.trim() !== '') {
                                dispatch(changePack({_id: pack._id, name: changedPackValue}));
                            }
                        };

                        const onPackChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            setChangedPackValue(e.currentTarget.value)
                        };

                        const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Enter') packChange();
                        };

                        return (
                            <TableRow
                                key={pack._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {
                                        editMode && changedPackID === pack._id
                                            ? <TextField
                                                autoFocus
                                                onBlur={packChange}
                                                onKeyUp={onKeyUpHandler}
                                                onChange={onPackChangeHandler}
                                                size={'small'}
                                            />
                                           // :  pack.name
                                        : <NavLink to={`/cards/${pack._id}`}>{pack.name}</NavLink>

                                    }
                                </TableCell>
                                <TableCell align="center">{pack.cardsCount}</TableCell>
                                <TableCell align="center">{formattedDate}</TableCell>
                                <TableCell align="center">{pack.user_name}</TableCell>
                                <TableCell align="center">
                                    <IconButton disabled={true}>
                                        <School/>
                                    </IconButton>
                                    {
                                        userID === pack.user_id &&
                                        <>
                                            <IconButton onClick={() => dispatch(removePack(pack._id))}>
                                                <Delete/>
                                            </IconButton>
                                            <IconButton>
                                                <Edit onClick={() => {
                                                    setEditMode(true);
                                                    setChangedPackID(pack._id);
                                                }}/>
                                            </IconButton>
                                        </>
                                    }
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
