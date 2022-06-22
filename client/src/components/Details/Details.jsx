import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearPage, getDetails } from "../../redux/actions";

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
            {
                details ? (
                    <div>
                        <h1>Name: {details.name}</h1>
                        <h1>Weight: {details.weightMin} - {details.weightMax}</h1>
                        <h1>Height: {details.heightMin} - {details.heightMin}</h1>
                        {details.lifespanMax ?
                        <h1>Life span: {details.lifespanMin} - {details.lifespanMax}</h1> 
                        : <h1>Life span: {details.lifespanMin}</h1>}
                        <h1>Temperaments: {details.temperament}</h1>
                        <img src={details.image} alt={details.name}/>
                    </div>
                ) : <h1>Cargando</h1>
            }
        </div>
    )
};