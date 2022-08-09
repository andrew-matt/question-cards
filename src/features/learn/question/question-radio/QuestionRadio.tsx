import React, {ChangeEvent, FC} from 'react';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import {useAppSelector} from '../../../../common/hooks/hooks';

type QuestionRadioPropsType = {
    showAnswer: boolean
    radioValue: number
    setRadioValue: (value: number) => void
}

export const QuestionRadio: FC<QuestionRadioPropsType> = ({showAnswer, radioValue, setRadioValue}) => {

    const card = useAppSelector(state => state.learn.card);

    const onRadioChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setRadioValue(+(event.target as HTMLInputElement).value);
    };

    if (showAnswer) {
        return (
            <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Answer:
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    {card.answer}
                </Typography>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Rate yourself:</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={radioValue}
                        onChange={onRadioChangeHandler}
                    >
                        <FormControlLabel value={1} control={<Radio/>} label="Did not know"/>
                        <FormControlLabel value={2} control={<Radio/>} label="Forgot"/>
                        <FormControlLabel value={3} control={<Radio/>} label="A lot of thought"/>
                        <FormControlLabel value={4} control={<Radio/>} label="Confused"/>
                        <FormControlLabel value={5} control={<Radio/>} label="Knew the answer"/>
                    </RadioGroup>
                </FormControl>
            </>
        );
    } else {
        return <></>
    }
};