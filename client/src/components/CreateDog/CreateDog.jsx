import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch} from "react-redux";
import { createDog } from "../../redux/actions";


export default function CreateDog(){

    const [input, setInput] = useState({
        name: "",
        weightMin: "",
        weightMax: "",
        heightMin: "",
        heightMax: "",
        lifespanMin: "",
        lifespanMax: "",
        image: "",
        })

    const dispatch = useDispatch();
    const history = useHistory();

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    };

    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(createDog(input));
        setInput({
            name: "",
            weightMin: "",
            weightMax: "",
            heightMin: "",
            heightMax: "",
            lifespanMin: "",
            lifespanMax: "",
            image: "",
        });
        history.push('/home');
    }

    return(
        <div>
            <Link to='/home'>
                <button>Back to Home</button>
            </Link>
            <h1>FUNCIONA HIJA DEMIL PUTA</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input name="name" type='text' placeholder="Enter the name..."  onChange={(e) => handleChange(e)} />
                </div>
                <div>
                    <label>Weight min:</label>
                    <input name="weightMin" type='number' min='1' max='100' placeholder="Min"  onChange={(e) => handleChange(e)}/>kg.
                    <label>Weight max:</label>
                    <input name="weightMax" type='number' min='1' max='100' placeholder="Max"  onChange={(e) => handleChange(e)}/>kg.
                </div>
                <div>
                    <label>Height min:</label>
                    <input name="heightMin" type='number' min='1' max='100' placeholder="Min"  onChange={(e) => handleChange(e)}/>cm.
                    <label>Height max:</label>
                    <input name="heightMax" type='number' min='1' max='100' placeholder="Max"  onChange={(e) => handleChange(e)}/>cm.
                </div>
                <div>
                    <label>Life time min:</label>
                    <input name="lifespanMin" type='number' min='1' max='100' placeholder="Min"  onChange={(e) => handleChange(e)}/>years.
                    <label>Life time max:</label>
                    <input name="lifespanMax" type='number' min='1' max='100' placeholder="Max"  onChange={(e) => handleChange(e)}/>years.
                </div>
                <div>
                    <label>Image:</label>
                    <input type='imagen' name="image" placeholder="URL"  onChange={(e) => handleChange(e)} />
                </div>
                <button type="submit" >Crear!</button>
            </form>
        </div>
    )
}