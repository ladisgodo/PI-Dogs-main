import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearPage, getDetails } from "../../redux/actions";
import { Link } from "react-router-dom";
import s from './Details.module.css'

export default function Details(){
    const { id } = useParams();
    const dispatch = useDispatch();

    const details = useSelector((state) => state.details);

    useEffect(() =>{
        dispatch(getDetails(id))

        return () =>{
            dispatch(clearPage())
        }
    },[dispatch, id])

    return(
        <div>
            <div className={s.container}>
                {
                    details ? (
                        <div className={s.details}>
                                <div className={s.title}>
                                    <h1 className={s.name}>{details.name}</h1>
                                </div>
                                <div className={s.text}>
                                    <h1 className={s.info}>Weight: {details.weightMin} kg - {details.weightMax} kg</h1>
                                    <h1 className={s.info}>Height: {details.heightMin} cm - {details.heightMax} cm</h1>
                                    {details.lifespanMax ?
                                    <h1 className={s.info}>Life span: {details.lifespanMin} - {details.lifespanMax} years</h1> 
                                    : <h1>Life span: {details.lifespanMin}</h1>}
                                    <h1 className={s.info}>Temperaments: {details.temperament}</h1>
                                </div>
                                <div className={s.span}>
                                    <img className={s.img} src={details.image} alt={details.name}/>
                                    <Link to='/home'>
                                        <button className={s.btn}>Back to Home</button>
                                    </Link>
                                </div>
                        </div>
                    ) : <h1>Cargando</h1>
                }
                </div>
        </div>
    )
};