import React from "react";
import s from './LoadingDetails.module.css'

export default function LoadingDetails({ setLoadingDetails }){
        setTimeout(() =>{
            setLoadingDetails(false)
        }, 700)
    return(
        <div className={s.container}>
            <div className={s.loading}></div>
        </div>
    )
}