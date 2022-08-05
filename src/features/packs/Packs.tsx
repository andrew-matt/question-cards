import style from './Packs.module.css';
import {Navigate} from 'react-router-dom';
import {PacksList} from './packs-list/PacksList';
import {fetchPacks, RequestedPacksType} from './packs-reducer';
import {useAppDispatch, useAppSelector, useDebounce} from '../../common/hooks/hooks';
import {PacksHeader} from './packs-header/PacksHeader';
import {CardsAmountSlider} from './packs-slider/CardsAmountSlider';
import {PacksSearchField} from './packs-search-field/PacksSearchField';
import {useEffect} from 'react';

export const Packs = () => {

    const dispatch = useAppDispatch();
    const page = useAppSelector<number>(state => state.packs.currentPage);
    const pageCount = useAppSelector<number>(state => state.packs.packsPerPage);
    const user_id = useAppSelector<string>(state => state.profile.UserData._id);
    const min = useAppSelector<number>(state => state.packs.minAndMaxCardsAmount[0]);
    const max = useAppSelector<number>(state => state.packs.minAndMaxCardsAmount[1]);
    const sortPacks = useAppSelector<string>(state => state.packs.sortBy);
    const requestedPacks = useAppSelector<RequestedPacksType>(state => state.packs.requestedPacks);
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn);
    const packName = useAppSelector<string>(state => state.packs.searchedValue);

    const debouncedValue = useDebounce<string>(packName, 500);

    useEffect(() => {
        dispatch(fetchPacks(user_id));
    }, [dispatch, page, pageCount, user_id, min, max, sortPacks, debouncedValue, requestedPacks]);

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div className={style.container}>
            <PacksHeader/>
            <div className={style.controlPanel}>
                <PacksSearchField/>
                <CardsAmountSlider/>
            </div>
            <PacksList/>
        </div>
    );
};