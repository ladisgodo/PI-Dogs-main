import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../../redux/actions'
import Cards from "../Cards/Cards";
import s from './Home.module.css';
import backgroundHome from '../Img/backgroundHome.webp';
import Loading from "./Loading/Loading";

export default function Home() {

    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.dogs);
    useEffect(() =>{
        dispatch(getDogs())
    },[dispatch]);

    const [loading = true, setLoading] = useState();

    /* return (
        <div>
            <div className={s.container} >
                {
                    dogs.length>0 ? (
                            dogs.map((d) =>{
                                return(
                                    <div key={d.id}>
                                        <Cards
                                        id={d.id}
                                        name={d.name}
                                        img={d.image}
                                        weightMin={d.weightMin}
                                        weightMax={d.weightMax}
                                        temperament={d.temperament}
                                        className={s.cards}
                                        />
                                    </div>
                                )
                            })
                    )
                    : <h1>Cargando</h1>
                }
            </div>
        </div>
    ) */

    return (
        <div>
            {
                loading ? (
                    <Loading setLoading={setLoading} />
                ) : (
                    <div>
                        <div>
                            <img src={backgroundHome} alt='background-home' className={s.img} />
                            <div className={s.cards} >
                                <Cards dogs={dogs} />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}