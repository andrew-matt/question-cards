import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import style from './Learn.module.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Question} from './question/Question';
import {useAppDispatch, useAppSelector} from '../../common/hooks/hooks';
import {ClearCardsListAC, getCards} from '../cards/cards-reducer';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

export const Learn = () => {

    const cards = useAppSelector(state => state.cards.cards);
    const packs = useAppSelector(state => state.packs.packsList);

    const dispatch = useAppDispatch();

    const {cardsPack_id} = useParams();

    const navigate = useNavigate();

    const pageCount = packs.filter((pack) => pack._id === cardsPack_id)[0].cardsCount;
    const packName = packs.filter((pack) => pack._id === cardsPack_id)[0].name;

    useEffect(() => {
        dispatch(getCards({cardsPack_id, pageCount}));
    }, []);

    const onBackToPacksListClickHandler = () => {
        dispatch(ClearCardsListAC());
        return navigate('/packs');
    };

    if (cards.length === 0) {
        return (
            <div className={style.circleLoading}>
                <CircularProgress/>
            </div>
        );
    }

    return (
        <div className={style.container}>
            <div className={style.linkWrapper}>
                <KeyboardBackspaceIcon/>
                <span onClick={onBackToPacksListClickHandler} className={style.link}>Back to Packs List</span>
            </div>
            <Question packName={packName}/>
        </div>
    );
};