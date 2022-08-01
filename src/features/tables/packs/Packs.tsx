import style from './Packs.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppRootStateType} from '../../../app/store';
import {Navigate} from 'react-router-dom';
import {PacksList} from './PacksList';
import {Button} from '@mui/material';
import {addPack, fetchAllPacks, fetchUserPacks, RequestedPacksType, setRequestedPacks} from './packs-reducer';

export const Packs = () => {

    const dispatch: AppDispatch = useDispatch();
    const userID = useSelector<AppRootStateType, string>(state => state.profile.UserData._id);
    const requestedPacks = useSelector<AppRootStateType, RequestedPacksType>(state => state.packs.requestedPacks);
    const isLoggedIn = useSelector<AppRootStateType>(state => state.login.isLoggedIn);

    const onUserPacksButtonClickHandler = () => {
        dispatch(fetchUserPacks(userID));
        dispatch(setRequestedPacks(`User's`));
    };

    const onAllPacksButtonClickHandler = () => {
        dispatch(fetchAllPacks());
        dispatch(setRequestedPacks('All'));
    };

    const onAddPackButtonClickHandler = () => {
        dispatch(addPack(userID, requestedPacks));
    };

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div className={style.container}>
            <div className={style.header}>
                <span className={style.title}>Packs list</span>
                <Button variant={requestedPacks === `User's` ? 'contained' : 'outlined'}
                        onClick={onUserPacksButtonClickHandler}>MY PACKS</Button>
                <Button variant={requestedPacks === 'All' ? 'contained' : 'outlined'}
                        onClick={onAllPacksButtonClickHandler}>ALL PACKS</Button>
                <Button variant={'contained'} onClick={onAddPackButtonClickHandler}>ADD NEW PACK</Button>
            </div>
            <PacksList/>
        </div>
    );
};