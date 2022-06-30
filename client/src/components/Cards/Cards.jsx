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
                            <div className={s.weight}>
                                <h1 className={s.text}>Minimum weight:{d.weightMin}kg</h1>
                                <h1 className={s.text}>Maximum weight:{d.weightMax}kg</h1>
                            </div>
                            <h1 className={s.temp}>Temperaments: {d.temperament}</h1>
                            <Link to={`/dogs/${d.id}`} >
                                <button className={s.btn}>View details</button>
                            </Link>
                        </div>
                    </div>
                )
            })
            }
        </div>
    )
}