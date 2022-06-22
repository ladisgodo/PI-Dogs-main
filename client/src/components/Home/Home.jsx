import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../../redux/actions'
import Cards from "../Cards/Cards";
import s from './Home.module.css';

export default function Home() {

    const dispatch = useDispatch()
    
    const dogs = useSelector((state) => state.dogs)

    useEffect(() =>{
        dispatch(getDogs())
    },[dispatch]);

    return (
        <div className={s.container} >
            {
                dogs.length>0 ? (
                        dogs.map((d) =>{
                            return(
                                <div>
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
                ) : <h1>Cargando</h1>
            }
        </div>
    )
}