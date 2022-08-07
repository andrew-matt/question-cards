import React, {useState} from 'react';
import {CustomModal} from "../../CustomModal";
import style from '../CardModal.module.css'
import {AddNewCardSelectFormatQuestion} from "./AddNewCardSelectFormatQuestion";
import {AddNewCardModalQuestion} from "./AddNewCardModalQuestion";
import {AddNewCardModalAnswer} from "./AddNewCardModalAnswer";
import Button from '@mui/material/Button/Button';
import {useAppDispatch} from "../../../common/hooks/hooks";
import {addCard} from "../../../features/cards/cards-reducer";
import {useParams} from "react-router-dom";
import {RequestCreateCardType} from "../../../features/cards/cards-api";

export const AddNewCardModal = () => {
    const {cardsPackID} = useParams()
    const [textQuestion, setTextQuestion] = useState('')
    const [textAnswer, setTextAnswer] = useState('')

    const dispatch = useAppDispatch()

    const addCardHandler = () => {
        const data:RequestCreateCardType = {
            card: {
                cardsPack_id: cardsPackID || "",
                question:textQuestion,
                answer:textAnswer
            }
        }
        dispatch(addCard(data))
    }

    return (
        <CustomModal>
            <div className={style.cardModal__wrapper}>
                <h2 className={style.cardModal__title}>Add new card</h2>
                <h4 className={style.cardModal__text}>Choose a question format</h4>
                <AddNewCardSelectFormatQuestion/>
                <AddNewCardModalQuestion question={textQuestion} setQuestion={setTextQuestion}/>
                <AddNewCardModalAnswer answer={textAnswer} setAnswer={setTextAnswer}/>
                <Button variant="contained" onClick={addCardHandler}>Contained</Button>
            </div>
        </CustomModal>
    );
};
