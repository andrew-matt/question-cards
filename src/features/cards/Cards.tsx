import React, {useEffect} from 'react';
import style from './Cards.module.css'

import CardsTable from "./cards-table-list/CardsTable";
import Button from '@mui/material/Button/Button';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {addCards, getCards} from "./cards-reducer";
import {AppDispatch, AppRootStateType} from "../../app/store";


export const Cards: React.FC = () => {
    const {cardsPackID} = useParams()
    const dispatch:AppDispatch = useDispatch()
    const currentCardsPackIsMyOrAll = useSelector<AppRootStateType>(state => state.packs.requestedPacks)

    useEffect(() => {
        if (cardsPackID) dispatch(getCards(cardsPackID))
    }, [])

    const addCardHandler = () => {
        if (cardsPackID) {
            dispatch(addCards({
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
                {currentCardsPackIsMyOrAll === "User's" && <Button variant="contained" onClick={addCardHandler}>Add task</Button>}
            </div>
            <CardsTable/>
        </div>
    );
};
