import React from "react";
import { Link } from 'react-router-dom';


export default function LandingPage() {

    return(
        <div>
            <Link to='/home'>
                <h1>Estoy en la LandingPage</h1>
                <button>Entrar a home</button>
            </Link>
        </div>
    )
}