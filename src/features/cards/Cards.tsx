import React, {useEffect, useState} from 'react';
import style from './Cards.module.css'

import CardsTable from "./cards-table-list/CardsTable";
import Button from '@mui/material/Button/Button';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {addCard, getCards} from "./cards-reducer";
import {AppDispatch, AppRootStateType} from "../../app/store";


export const Cards: React.FC = () => {
    const {cardsPackID} = useParams()
    const dispatch:AppDispatch = useDispatch()
    const userID = useSelector<AppRootStateType, string>(state => state.profile.UserData._id);
    const cardsUserID = useSelector<AppRootStateType>(state => state.cards.packUserId)

    useEffect(() => {
        if (cardsPackID) dispatch(getCards(cardsPackID))
    }, [])

    const addCardHandler = () => {
        if (cardsPackID) {
            dispatch(addCard({
                card: {
                    cardsPack_id: cardsPackID
                }
            }))
        }
    }

    return (
        <div className={style.cards}>
            <div className={style.cards__wrapper}>
                <h2 className={style.cards__title}>Cards</h2>
                <Button
                    variant="contained"
                    onClick={addCardHandler}
                    disabled={userID !== cardsUserID}
                >Add task
                </Button>
            </div>
            <CardsTable/>
        </div>
    );
};
