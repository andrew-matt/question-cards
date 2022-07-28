import React from 'react';
import style from './AppLinearProgress.module.css'
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";

export const AppLinearProgress = () => {
    return (
        <div className={style.linearProgress}>
            <LinearProgress />
        </div>
    );
};
