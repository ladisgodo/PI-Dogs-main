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
                                {
                                    !d.weightMax ? <h1 className={s.text}><u>Minimum weight:</u> {d.weightMin}kg</h1>
                                    : d.weightMin == 'NaN' ? <h1 className={s.text}><u>Maximum weight:</u> {d.weightMax}kg</h1>
                                    :   <div className={s.weight}>
                                            <h1 className={s.text}><u>Minimum weight:</u> {d.weightMin}kg</h1>
                                            <h1 className={s.text}><u>Maximum weight:</u> {d.weightMax}kg</h1>
                                        </div>
                                    
                                }
                            </div>
                            <h1 className={s.temp}><u>Temperaments:</u> {d.temperament}</h1>
                            <Link to={`/dogs/${d.id}`} style={{textDecoration: 'none'}}>
                                    <button className={s.btn}>View details
                                        <svg className={s.svg} width="13px" height="10px" viewBox="0 0 13 10">
                                            <path d="M1,5 L11,5"></path>
                                            <polyline points="8 1 12 5 8 9"></polyline>
                                        </svg>
                                    </button>
                            </Link>
                        </div>
                    </div>
                )
            })
            }
        </div>
    )
}