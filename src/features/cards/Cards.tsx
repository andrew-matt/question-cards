import React, { useEffect} from 'react';
import style from './Cards.module.css'

import CardsTable from "./cards-table-list/CardsTable";
import Button from '@mui/material/Button/Button';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {addCard, ClearCardsListAC, clearSortParamsAC, getCards} from "./cards-reducer";
import {AppDispatch, AppRootStateType} from "../../app/store";
import {getCardQueryParams} from "./cards-api";
import {CardsSearchByQuestion} from "./cards-search-by-question/CardsSearchByQuestion";
import {CardsPagination} from "./cards-pagination/Cards-pagination";


export const Cards: React.FC = () => {
    const {cardsPackID} = useParams()
    const dispatch: AppDispatch = useDispatch()

    const queryParams = useSelector<AppRootStateType,getCardQueryParams>(state => state.cards.queryParams)

    const userID = useSelector<AppRootStateType, string>(state => state.profile.UserData._id);
    const cardsUserID = useSelector<AppRootStateType>(state => state.cards.packUserId)
    const currentPackName = useSelector<AppRootStateType, string>(state => state.packs.nameOfCurrentPack)

    useEffect(() => {
        dispatch(getCards({...queryParams, cardsPack_id:cardsPackID}))
        return () => {
            dispatch(ClearCardsListAC())

        }
    }, [queryParams])

    const addCardHandler = () => {
        if (cardsPackID) dispatch(addCard({card: {cardsPack_id: cardsPackID}}))
    }



    return (
        <div className={style.cards}>
            <div className={style.cards__wrapper}>
                <header className={style.cards__header}>
                    <h2 className={style.cards__title}>{currentPackName}</h2>
                    <Button
                        variant="contained"
                        onClick={addCardHandler}
                        disabled={userID !== cardsUserID}
                    >Add task
                    </Button>
                </header>
                <CardsSearchByQuestion />
                <CardsTable/>
                <CardsPagination/>
            </div>
        </div>
    );
};
