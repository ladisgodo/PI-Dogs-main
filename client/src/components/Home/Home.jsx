import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getDogs } from '../../redux/actions'
import Cards from "../Cards/Cards";

export default function Home() {

    const dispatch = useDispatch()
    
    const dogs = useSelector((state) => state.dogs)

    useEffect(() =>{
        dispatch(getDogs())
    },[dispatch]);

    return (
        <div>
            {
                dogs.length>0 ? (
                        dogs.map((d) =>{
                            return(
                                <div>
                                    <Cards
                                    name={d.name}
                                    img={d.img}
                                    weightMin={d.weightMin}
                                    weightMax={d.weightMax}
                                    temperaments={d.temperaments}
                                    />
                                </div>
                            )
                        })
                ) : <h1>Cargando</h1>
            }
        </div>
    )
}