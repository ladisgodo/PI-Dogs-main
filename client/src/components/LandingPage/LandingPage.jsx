import React from "react";
import { Link } from 'react-router-dom';


export default function LandingPage() {

    return(
        <div>
            <h1>Estoy en la LandingPage</h1>
            <Link to='/home'>
                <button>Entrar a home</button>
            </Link>
        </div>
    )
}