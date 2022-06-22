import React from "react";
import { Link } from "react-router-dom";
import s from './Cards.module.css'

export default function Cards({dogs}){

    return(
        <div className={s.container}>
            {
            dogs.map((d) =>{
                return(
                    <div className={s.cards} key={d.id}>
                        <div className={s.content}>
                            <h1>Name: {d.name}</h1>
                            <img src={d.image} alt={d.name} className={s.img} />
                            <h1 className={s.text} >WeightMin:{d.weightMin}kg weightMax:{d.weightMax}kg</h1>
                            <h1>Temperaments: {d.temperament}</h1>
                            <Link to={`/dogs/${d.id}`} >
                                <h1>View dog</h1>
                            </Link>
                        </div>
                    </div>
                )
            })
            }
        </div>
    )
}