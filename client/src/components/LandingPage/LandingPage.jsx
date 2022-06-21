import React from "react";
import { Link } from 'react-router-dom';
import background from '../Img/background'


export default function LandingPage() {

    return(
        <div>
            <div>
               {/*  <img src={background} alt={'background'} /> */}
                <h1>Estoy en la LandingPage</h1>
                <Link to='/home'>
                    <button>Entrar a home</button>
                </Link>
            </div>
        </div>
    )
}