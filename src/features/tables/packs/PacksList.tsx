import * as React from 'react';
import {useEffect} from 'react';
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
import {clearPacksList, fetchPacks, removePack} from './packs-reducer';
import {IconButton} from '@mui/material';
import {Delete, School} from '@mui/icons-material';

export const PacksList = () => {

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

                        return (
                            <TableRow
                                key={pack._id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">{pack.name}</TableCell>
                                <TableCell align="center">{pack.cardsCount}</TableCell>
                                <TableCell align="center">{formattedDate}</TableCell>
                                <TableCell align="center">{pack.user_name}</TableCell>
                                <TableCell align="center">
                                    <IconButton disabled={true}>
                                        <School/>
                                    </IconButton>
                                    {
                                        userID === pack.user_id &&
                                        <IconButton onClick={() => dispatch(removePack(pack._id))}>
                                            <Delete/>
                                        </IconButton>
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
