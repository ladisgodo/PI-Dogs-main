import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../../redux/actions'
import Cards from "../Cards/Cards";
import s from './Home.module.css';
import backgroundHome from '../Img/backgroundHome.webp';
import Loading from "./Loading/Loading";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../NavBar/NavBar";

export default function Home() {

    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.dogs);
    useEffect(() =>{
        dispatch(getDogs())
    },[dispatch]);

    const [loading = true, setLoading] = useState();
    const [order, setOrder] = useState("");

    return (
        <div>
            {
                loading ? (
                    <Loading setLoading={setLoading} />
                ) : (
                    <div className={s.container} >
                            <img src={backgroundHome} alt='background-home' className={s.img} />
                        <div className={s.content}>
                            <NavBar setOrder={setOrder} />
                            <SearchBar/>
                            <div>
                                <Cards dogs={dogs} />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}