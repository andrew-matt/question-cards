import TableBody from '@mui/material/TableBody/TableBody';
import TableCell from '@mui/material/TableCell/TableCell';
import TableRow from '@mui/material/TableRow/TableRow';
import React, {useEffect} from 'react';
import {CardType} from '../cards-api';
import {IconButton, Rating} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {changeCardsTotalCountAC, deleteCard, updateCard} from "../cards-reducer";

import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {convertDate} from "../../../utils/convert-date";

type CardsTableRowsPropsType = {
    rows: CardType[]
}

export const CardsTableRows: React.FC<CardsTableRowsPropsType> = (props) => {
    const {
        rows
    } = props

    useEffect(() => {
        return () => {
            dispatch(changeCardsTotalCountAC(-1))
        }
    },[])

    const userID = useAppSelector(state => state.profile.UserData._id);

    const dispatch = useAppDispatch()

    const deleteCardHandler = (cardID: string, cardsPackID: string) => {
        dispatch(deleteCard(cardID, cardsPackID))
    }

    const updateCardHandler = (cardID: string, cardsPackID: string) => {
        dispatch(updateCard(cardID, cardsPackID))
    }


    return (
        <TableBody>
            {rows.map((row) => (
                <TableRow
                    key={row.question + Math.random()}
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <TableCell component="th" scope="row">
                        {row.question}
                    </TableCell>
                    <TableCell>{row.answer}</TableCell>
                    <TableCell>{convertDate(row.updated)}</TableCell>
                    <TableCell valign={"middle"}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <Rating name="disabled" value={row.grade} disabled/>
                            <IconButton
                                onClick={() => deleteCardHandler(row._id, row.cardsPack_id)}
                                disabled={userID !== row.user_id}
                            >
                                <Delete/>
                            </IconButton>
                            <IconButton
                                onClick={() => updateCardHandler(row._id, row.cardsPack_id)}
                                disabled={userID !== row.user_id}
                            >
                                <Edit/>
                            </IconButton>
                        </div>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );


};
