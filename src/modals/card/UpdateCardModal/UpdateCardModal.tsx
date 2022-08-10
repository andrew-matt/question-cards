import React, {ChangeEvent, useState} from 'react';
import Button from "@mui/material/Button/Button";
import {CustomModal} from "../../CustomModal";
import {IconButton} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import style from "../CardModal.module.css";
import {deleteCard, updateCard} from "../../../features/cards/cards-reducer";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import TextField from "@mui/material/TextField/TextField";


type UpdateCardModalPropsType = {
    cardID:string
    cardPackID:string
    isDisabled:boolean
    questionText:string
    answerText:string
}

export const UpdateCardModal:React.FC<UpdateCardModalPropsType> = (props) => {
    const {
        cardPackID,
        questionText,
        answerText,
        cardID,
        isDisabled
    } = props
    const [isOpen, setIsOpen] = useState(false)
    const handleClose = () => setIsOpen(false);
    const handleOpen = () => setIsOpen(true);
    const [newAnswerText,setNewAnswerText] = useState(answerText)
    const [newQuestionText,setNewQuestionText] = useState(questionText)
    const dispatch = useAppDispatch()

    const setNewQuestionHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewQuestionText(e.currentTarget.value)
    }

    const setNewAnswerHandler = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewAnswerText(e.currentTarget.value)
    }

    const handleUpdateCard = () => {
        dispatch(updateCard(cardID, cardPackID, newQuestionText, newAnswerText))
    }

    return (
        <>
            <IconButton onClick={handleOpen} disabled={isDisabled}>
                <Edit/>
            </IconButton>
            <CustomModal modalName={'Update card'} open={isOpen} handleClose={handleClose}>
                <div className={style.cardModal__wrapper}>
                    <TextField
                        id="standard-basic"
                        label="Question"
                        variant="standard"
                        value={newQuestionText}
                        onChange={setNewQuestionHandler}
                    />
                    <TextField
                        id="standard-basic"
                        label="Answer"
                        variant="standard"
                        value={newAnswerText}
                        onChange={setNewAnswerHandler}
                    />
                    <div>
                        <Button variant={"contained"} color={"inherit"} onClick={handleClose}>Cancel</Button>
                        <Button variant={"contained"} color={"error"} onClick={handleUpdateCard}>Update</Button>
                    </div>
                </div>
            </CustomModal>
        </>
    );
};