import style from './Packs.module.css';
import {Navigate} from 'react-router-dom';
import {PacksList} from './PacksList';
import {Button} from '@mui/material';
import {addPack, fetchPacks, RequestedPacksType, setCurrentPage, setRequestedPacks} from './packs-reducer';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';

export const Packs = () => {

    const dispatch = useAppDispatch();
    const user_id = useAppSelector<string>(state => state.profile.UserData._id);
    const pageCount = useAppSelector<number>(state => state.packs.packsPerPage);
    const requestedPacks = useAppSelector<RequestedPacksType>(state => state.packs.requestedPacks);
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn);

    const onUserPacksButtonClickHandler = () => {
        const page = 1;
        dispatch(setCurrentPage(page));
        dispatch(fetchPacks({page, pageCount, user_id}));
        dispatch(setRequestedPacks(`User's`));
    };

    const onAllPacksButtonClickHandler = () => {
        const page = 1;
        dispatch(setCurrentPage(page));
        dispatch(fetchPacks({page, pageCount}));
        dispatch(setRequestedPacks('All'));
    };

    const onAddPackButtonClickHandler = () => {
        dispatch(addPack(requestedPacks, pageCount, user_id));
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