import React from "react";
import loadingImage from '../../Img/Loading.jpg'
import s from './Loading.module.css'

export default function Loading({ setLoading }){
        setTimeout(() =>{
            setLoading(false)
        }, 1500)
    return(
        <div className={s.container}>
            {/* <img src={loadingImage} className={s.img} alt='loading'/> */}
            <div className={s.loading}></div>
        </div>
    )
}