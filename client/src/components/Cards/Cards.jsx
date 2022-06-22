import React from "react";
import { Link } from "react-router-dom";
import s from './Cards.module.css'

export default function Cards({id, name, img, weightMin, weightMax, temperament}){
    return (
        <div>
            <Link to={`/dogs/${id}`} >
                <div className={s.container} >
                    <h1 className={s.text} >Name: {name}</h1>
                    <img src={img} alt={name} className={s.img} />
                    <h1 className={s.text} >WeightMin:{weightMin}kg weightMax:{weightMax}kg</h1>
                    <h1 className={s.text} >Temperaments: {temperament}</h1>
                </div>
            </Link>
        </div>
    );
}