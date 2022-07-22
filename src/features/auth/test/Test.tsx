import style from './Test.module.css';
import SuperInputText from '../../../common/super-components/SuperInputText/SuperInputText';
import SuperButton from '../../../common/super-components/SuperButton/SuperButton';
import SuperCheckbox from '../../../common/super-components/SuperCheckbox/SuperCheckbox';
import {useState} from 'react';

export const Test = () => {
    const [text, setText] = useState<string>('');
    const error = text ? '' : 'error';

    return (
        <div className={style.mainBlock}>
            Test
            <div>
                <SuperInputText/>
            </div>
            <div className={style.errorInputContainer}>
                <SuperInputText
                    error={error}
                    onChange={e => setText(e.currentTarget.value)}
                />
            </div>
            <div>
                <SuperButton>Test</SuperButton>
            </div>
            <div>
                <SuperButton red>Delete</SuperButton>
            </div>
            <div>
                <SuperButton disabled>Disabled</SuperButton>
            </div>
            <div>
                <SuperCheckbox/>
            </div>
        </div>
    );
};