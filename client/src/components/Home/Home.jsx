import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments } from '../../redux/actions'
import Cards from "../Cards/Cards";
import s from './Home.module.css';
import backgroundHome from '../Img/backgroundHome.webp';
import Loading from "./Loading/Loading";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../NavBar/NavBar";
import Pagination from "../Pagination/Pagination";
import FinalBar from "../FinalBar/FinalBar";

export default function Home() {

    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.dogs);
    useEffect(() =>{
        dispatch(getDogs())
    },[dispatch]);
    
    useEffect(() =>{
        dispatch(getTemperaments())
    },[dispatch]);

    const [loading = true, setLoading] = useState();
    const [order, setOrder] = useState("");

    // Paginado

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(8);
    const [input, setInput] = useState(1);

    const max = Math.ceil(dogs.length / 8)

    return (
        <div>
            {
                loading ? (
                    <Loading setLoading={setLoading} />
                ) : 
                        <div className={s.container} >
                                <img src={backgroundHome} alt='background-home' className={s.img} />
                            <div className={s.content}>
                                <NavBar className={s.navbar} setOrder={setOrder} setPage={setPage} setInput={setInput} />
                                <SearchBar setPage={setPage} setInput={setInput}/>
                                {
                                    dogs.length > 0 ? (
                                        <div>
                                            <Pagination page={page} setPage={setPage} max={max} input={input} setInput={setInput} />
                                            <div>
                                                <Cards dogs={dogs} page={page} perPage={perPage}/>
                                            </div>
                                            <Pagination page={page} setPage={setPage} max={max} input={input} setInput={setInput} /> 
                                        </div>
                                    ) : <div className={s.error}>
                                            <div className={s.error2}>
                                                <h1 className={s.notfound}>404 NOT FOUND</h1>
                                                <h1 className={s.text1}>Ooops, dog not found</h1>
                                                <p className={s.text2}>Sorry, but the requested dog is not found. Please press <b>"Reset filters"</b> button.</p>
                                            </div>
                                        </div>
                                }
                                <FinalBar/>
                            </div>
                        </div>
                }
        </div>
    )
}