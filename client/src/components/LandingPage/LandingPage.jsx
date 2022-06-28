import React from "react";
import { Link } from 'react-router-dom';
import background from '../Img/background.jpg'
import s from './LandingPage.module.css'


export default function LandingPage() {

    return(
        <div className={s.container} >
            <img src={background} alt='background' className={s.img} ></img>
                    <h1 className={s.title}>Welcome to my Dog Page</h1>
                <Link to='/home'>
                    <button className={s.btn}>Entrar a home</button>
                </Link>
        </div>
    )
}