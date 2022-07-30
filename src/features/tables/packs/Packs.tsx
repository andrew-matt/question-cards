import style from './Packs.module.css';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import {Navigate} from 'react-router-dom';
import {PacksList} from './PacksList';

export const Packs = () => {

    const isLoggedIn = useSelector<AppRootStateType>(state => state.login.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div className={style.container}>
            <PacksList/>
        </div>
    );
};