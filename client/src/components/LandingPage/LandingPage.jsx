import React from "react";
import { Link } from 'react-router-dom';
import background from '../Img/background.jpg'
import styles from './LandingPage.module.css'


export default function LandingPage() {

    return(
        <div className={styles.container} >
            <img src={background} alt='background' className={styles.img} ></img>
            <div>
                <Link to='/home'>
                    <button className={styles.btn} >Entrar a home</button>
                </Link>
            </div>
        </div>
    )
}