import React from "react";
import loadingImage from '../../Img/Loading.jpg'
import s from './Loading.module.css'

export default function Loading({ setLoading }){
    return(
        <div>
            <img src={loadingImage} className={s.img} alt='loading'/>
            {
                setTimeout(() =>{
                    setLoading(false)
                }, 1500)
            }
        </div>
    )
}