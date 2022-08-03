import style from './Packs.module.css';
import {Navigate} from 'react-router-dom';
import {PacksList} from './PacksList';
import {Button, Slider} from '@mui/material';
import {addPack, fetchPacks, RequestedPacksType, setCurrentPage, setRequestedPacks} from './packs-reducer';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import SearchIcon from '@mui/icons-material/Search';
import {ResponseCardPackType} from "./packs-api";
import {useState} from "react";

export const Packs = () => {

    const dispatch = useAppDispatch();
    const page = useAppSelector<number>(state => state.packs.currentPage);
    const user_id = useAppSelector<string>(state => state.profile.UserData._id);
    const pageCount = useAppSelector<number>(state => state.packs.packsPerPage);
    const requestedPacks = useAppSelector<RequestedPacksType>(state => state.packs.requestedPacks);
    const isLoggedIn = useAppSelector<boolean>(state => state.login.isLoggedIn);
    const packs = useAppSelector<ResponseCardPackType[]>(state => state.packs.packsList);

    const [inputValue, setInputValue] = useState<string>('')
    const [value, setValue] = useState<number[]>([0, 100]);
    const min = value[0]
    const max= value[1]

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

       let searchedPackList=packs; //это значение передаю в PacksList
    if (inputValue>'') {
        searchedPackList = packs.filter((pack) =>
            pack.name.includes(inputValue)       //проверка на совпадение значения инпута и имени пака
        )
    }

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

    const onSearchCardsNumber=()=>{
        dispatch(fetchPacks({page, pageCount, user_id, min,max}))
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>;
    }

    return (
        <div className={style.container}>
            <div className={style.header}>
                <span className={style.title}>Packs list</span>
                <div className={style.search}>
                    <input type="text"
                           onChange={(e)=>setInputValue(e.currentTarget.value)}
                           className={style.searchField} placeholder="Provide your text"/>
                    <SearchIcon fontSize={'small'} className={style.searchIcon}/>
                </div>
                <Button variant={requestedPacks === `User's` ? 'contained' : 'outlined'}
                        onClick={onUserPacksButtonClickHandler}>MY PACKS</Button>
                <Button variant={requestedPacks === 'All' ? 'contained' : 'outlined'}
                        onClick={onAllPacksButtonClickHandler}>ALL PACKS</Button>
                <div style={{width:'170px', display:'flex'}}>
                    <div style={{paddingRight:"15px",width:'20px'}}>{value[0]}</div>
                <Slider
                    value={value}
                    onChange={handleChange}
                    style={{width:'130px'}}
                />
                    <div style={{paddingLeft:'15px'}}>{value[1]}</div>
                </div>
                <Button variant={'contained'} onClick={onSearchCardsNumber}>search</Button>
                <Button variant={'contained'} onClick={onAddPackButtonClickHandler}>ADD NEW PACK</Button>
            </div>
            <PacksList searchedPackList={searchedPackList} cardNumber={value} min={min} max={max}/>
        </div>
    );
};