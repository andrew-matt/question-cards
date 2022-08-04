import style from './Packs.module.css';
import {Navigate, useSearchParams} from 'react-router-dom';
import {PacksList} from './PacksList';
import {Button, Slider} from '@mui/material';
import {
    addPack,
    fetchPacks,
    RequestedPacksType,
    setCurrentPage,
    setRequestedPacks,
    setSearchedValue,
} from './packs-reducer';
import {useAppDispatch, useAppSelector, useDebounce} from '../../../common/hooks/hooks';
import SearchIcon from '@mui/icons-material/Search';
import {ChangeEvent, useEffect, useState} from 'react';

export const Packs = () => {

    const dispatch = useAppDispatch();

    const page = useAppSelector<number>(state => state.packs.currentPage);
    const user_id = useAppSelector<string>(state => state.profile.UserData._id);
    const pageCount = useAppSelector<number>(state => state.packs.packsPerPage);
    const requestedPacks = useAppSelector<RequestedPacksType>(state => state.packs.requestedPacks);
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn);
    const sortPacks = useAppSelector<string>(state => state.packs.sortBy);
    const packName = useAppSelector<string>(state => state.packs.searchedValue);

    const [searchParams, setSearchParams] = useSearchParams(requestedPacks);

    const debouncedValue = useDebounce<string>(packName, 500);
    const [value, setValue] = useState<number[]>([0, 110]);
    const min = value[0];
    const max = value[1];

    useEffect(() => {
        let currentLocation = searchParams.get('accessory');

        if (currentLocation) {
            dispatch(setRequestedPacks(currentLocation as RequestedPacksType));
        } else {
            setSearchParams({accessory: requestedPacks});
        }

        dispatch(fetchPacks({
            ...queryParams,
            packName,
        }, currentLocation ? currentLocation as RequestedPacksType : requestedPacks));
    }, [debouncedValue]);

    const queryParams = {page, pageCount, user_id, min, max, sortPacks, packName};

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchedValue(e.currentTarget.value));
    };

    const onUserPacksButtonClickHandler = () => {
        const page = 1;
        const requestedPacks = `User's`;
        setSearchParams({accessory: `User's` as RequestedPacksType});
        dispatch(setCurrentPage(page));
        dispatch(setRequestedPacks(requestedPacks));
        dispatch(fetchPacks({...queryParams, page}, requestedPacks));
    };

    const onAllPacksButtonClickHandler = () => {
        const page = 1;
        const requestedPacks = 'All';
        setSearchParams({accessory: 'All' as RequestedPacksType});
        dispatch(setCurrentPage(page));
        dispatch(setRequestedPacks(requestedPacks));
        dispatch(fetchPacks({...queryParams, page}, requestedPacks));
    };

    const onAddPackButtonClickHandler = () => {
        dispatch(addPack(queryParams, requestedPacks));
    };

    const onChangeCommittedHandler = () => {
        dispatch(fetchPacks(queryParams, requestedPacks));
    };

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div className={style.container}>
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
            <div className={style.controlPanel}>
                <div className={style.search}>
                    <input
                        type="text"
                        placeholder="Provide your text"
                        value={packName}
                        onChange={onSearchInputChange}
                        className={style.searchField}
                    />
                    <SearchIcon fontSize={'small'} className={style.searchIcon}/>
                </div>
                <div className={style.cardsAmountSliderContainer}>
                    <div className={style.cardsAmountSliderMinValue}>{value[0]}</div>
                    <Slider
                        min={0}
                        max={110}
                        value={value}
                        onChange={handleChange}
                        onChangeCommitted={onChangeCommittedHandler}
                        className={style.cardsAmountSlider}
                    />
                    <div className={style.cardsAmountSliderMaxValue}>{value[1]}</div>
                </div>
            </div>
            <PacksList cardNumber={value} min={min} max={max}/>
        </div>
    );
};