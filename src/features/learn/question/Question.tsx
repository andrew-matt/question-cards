import React, {useEffect, useState} from 'react';
import {getCard} from '../../../utils/random-utils';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import {setCard} from '../learn-reducer';
import style from '../Learn.module.css';
import {QuestionButtons} from './question-buttons/QuestionButtons';
import {QuestionRadio} from './question-radio/QuestionRadio';

export const Question = () => {

    const dispatch = useAppDispatch();

    const cards = useAppSelector(state => state.cards.cards);
    const card = useAppSelector(state => state.learn.card);

    const [radioValue, setRadioValue] = useState(1);
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        dispatch(setCard(getCard(cards)));
    }, [cards]);

    return (
        <div className={style.questionContainer}>
            <div className={style.questionWrapper}>
                <div>
                    number of attempts to answer the question: {card.shots}
                </div>
                <div>
                    Question:
                </div>
                <div>
                    {card && card.question}
                </div>
                <QuestionRadio showAnswer={showAnswer} radioValue={radioValue} setRadioValue={setRadioValue}/>
                <QuestionButtons showAnswer={showAnswer} radioValue={radioValue} setShowAnswer={setShowAnswer}/>
            </div>
        </div>
    );
};
