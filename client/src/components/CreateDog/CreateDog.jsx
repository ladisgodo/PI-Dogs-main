import React from "react";
import { Link } from "react-router-dom";


export default function CreateDog(){
    return(
        <div>
            <Link to='/home'>
                <button>Back to Home</button>
            </Link>
            <h1>FUNCIONA HIJA D EMIL PUTA</h1>
            <form>
                <div>
                    <label>Name:</label>
                    <input type='text' placeholder="Enter the name..." />
                </div>
            </form>
        </div>
    )
}