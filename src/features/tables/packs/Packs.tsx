import style from './Packs.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from '../../../app/store';
import {Navigate} from 'react-router-dom';
import {PacksList} from './PacksList';
import {Button} from '@mui/material';
import {addPack} from './packs-reducer';

export const Packs = () => {

    const dispatch: AppDispatch = useDispatch();

    const isLoggedIn = useSelector<AppRootStateType>(state => state.login.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div className={style.container}>
            <div className={style.header}>
                <span className={style.title}>Packs list</span>
                <Button variant={'contained'} onClick={() => dispatch(addPack())}>ADD NEW PACK</Button>
            </div>
            <PacksList/>
        </div>
    );
};