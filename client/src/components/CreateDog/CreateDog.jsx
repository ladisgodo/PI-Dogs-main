import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperaments } from "../../redux/actions";


export default function CreateDog(){

    const [input, setInput] = useState({
        name: '',
        weightMin: '',
        weightMax: '',
        heightMin: '',
        heightMax: '',
        lifespanMin: '',
        lifespanMax: '',
        image: '',
        temperament: [],
    });

    const dispatch = useDispatch();
    const allTemps = useSelector((state) => state.temperaments);

    useEffect(() =>{
        dispatch(getTemperaments())
    },[dispatch]);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }


    return(
        <div>
            <Link to='/home'>
                <button>Back to home</button>
            </Link>
            <h1>VAMO A CREAR</h1>
            <form>
                <div>
                    <label>Name:</label>
                    <input placeholder="Enter the name..." type='text' required/>
                </div>
                <div>
                    <label>Weight:</label>
                    <input placeholder="Min" min='1' max='100' type='number' required/>
                    <input placeholder="Max" min='1' max='100' type='number' required/>
                </div>
                <div>
                    <label>Height:</label>
                    <input placeholder="Min" min='1' max='100' type='number' required/>
                    <input placeholder="Max" min='1' max='100' type='number' required/>
                </div>
                <div>
                    <label>Life span:</label>
                    <input placeholder="Min" min='1' max='100' type='number' required/>
                    <input placeholder="Max" min='1' max='100' type='number' required/>
                </div>
                <div>
                    <label>Image:</label>
                    <input placeholder="URL" type='imagen' required/>
                </div>
                <div>
                    <label>Temperamens:</label>
                    <select>
                        <option hidden value=''>Choose temperaments</option>
                        {
                            allTemps.map((t) => (
                                <option key={t.id} value={t.name} >{t.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}