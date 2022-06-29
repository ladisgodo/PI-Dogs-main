import React from "react";
import { Link } from "react-router-dom";
import s from './Cards.module.css'

export default function Cards({dogs, page, perPage}){

    return(
        <div className={s.container}>
            {
            dogs.slice(
                (page - 1) * perPage,
                (page - 1) * perPage + perPage
            ).map((d) =>{
                return(
                    <div className={s.cards} key={d.id}>
                        <div className={s.content}>
                            <h1 className={s.name}>{d.name}</h1>
                            <img src={d.image} alt={d.name} className={s.img} />
                            <h1 className={s.weight} >weightMin:{d.weightMin}kg weightMax:{d.weightMax}kg</h1>
                            <h1 className={s.temp}>Temperaments: {d.temperament}</h1>
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