import style from '../Packs.module.css';
import {Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import {addPack, RequestedPacksType, setCurrentPage, setRequestedPacks} from '../packs-reducer';

export const PacksHeader = () => {

    const dispatch = useAppDispatch();
    const user_id = useAppSelector<string>(state => state.profile.UserData._id);
    const requestedPacks = useAppSelector<RequestedPacksType>(state => state.packs.requestedPacks);

    const onUserPacksButtonClickHandler = () => {
        dispatch(setCurrentPage(1));
        dispatch(setRequestedPacks(`User's`));
    };

    const onAllPacksButtonClickHandler = () => {
        dispatch(setCurrentPage(1));
        dispatch(setRequestedPacks('All'));
    };

    const onAddPackButtonClickHandler = () => {
        dispatch(addPack(user_id));
    };

    return (
        <div className={style.header}>
            <span className={style.title}>Packs list</span>
            <div>
                <Button
                    variant={requestedPacks === `User's` ? 'contained' : 'outlined'}
                    onClick={onUserPacksButtonClickHandler}
                    className={style.headerButtons}
                >
                    MY PACKS
                </Button>
                <Button
                    variant={requestedPacks === 'All' ? 'contained' : 'outlined'}
                    onClick={onAllPacksButtonClickHandler}
                    className={style.headerButtons}
                >
                    ALL PACKS
                </Button>
            </div>
            <Button variant={'contained'} onClick={onAddPackButtonClickHandler}>ADD NEW PACK</Button>
        </div>
    );
};
