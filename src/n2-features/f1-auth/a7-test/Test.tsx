import style from './Test.module.css';
import SuperInputText from '../../../n1-main/m1-ui/common/super-components/c1-SuperInputText/SuperInputText';
import SuperButton from '../../../n1-main/m1-ui/common/super-components/c2-SuperButton/SuperButton';
import SuperCheckbox from '../../../n1-main/m1-ui/common/super-components/c3-SuperCheckbox/SuperCheckbox';
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