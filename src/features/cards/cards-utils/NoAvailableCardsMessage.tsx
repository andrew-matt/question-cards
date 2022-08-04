import React from 'react';
import style from '../Cards.module.css'

export const NoAvailableCardsMessage = () => {
    return (
        <div className={style.noCards}>
            No cards available or invalid search =(
        </div>
    );
};