import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperaments, createDog } from "../../redux/actions";


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
        console.log(input);
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    function handleTemps(e){
        if(input.temperament.length < 4){
            setInput({
                ...input,
                temperament: [...input.temperament, e.target.value]
            })
        } else {
            alert('No puede tener mas de 4 temperamentos');
        }
        console.log(input.temperament)
    };

    function handleDelete(e){
        setInput({
            ...input,
            temperament: input.temperament.filter((t) => t !== e)
        })
    };

    function handleSubmit(e){
        e.preventDefault();
        if(
            input.name !== '' &&
            input.weightMin  &&
            input.weightMax  &&
            input.weightMax > input.weightMin &&
            input.heightMin  &&
            input.heightMax  &&
            input.heightMax > input.heightMin &&
            input.lifespanMin  &&
            input.lifespanMax  &&
            input.lifespanMax > input.lifespanMin &&
            input.temperament.length !== 0
        ){
            dispatch(createDog(input));
            console.log(input);
            alert('Dog created!!!!');
            setInput({
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
        } else {
            alert('The required fields are empty')
        }
    }


    return(
        <div>
            <Link to='/home'>
                <button>Back to home</button>
            </Link>
            <h1>VAMO A CREAR</h1>
            <form onSubmit={(e) =>handleSubmit(e)} >
                <div>
                    <label>Name:</label>
                    <input name='name' placeholder="Enter the name..." type='text' required onChange={(e) =>handleChange(e)}/>
                </div>
                <div>
                    <label>Weight:</label>
                    <input name='weightMin' placeholder="Min" min='1' max='100' type='number' required onChange={(e) =>handleChange(e)}/>
                    <input name='weightMax' placeholder="Max" min='1' max='100' type='number' required onChange={(e) =>handleChange(e)}/>
                </div>
                <div>
                    <label>Height:</label>
                    <input name='heightMin' placeholder="Min" min='1' max='100' type='number' required onChange={(e) =>handleChange(e)}/>
                    <input name='heightMax' placeholder="Max" min='1' max='100' type='number' required onChange={(e) =>handleChange(e)}/>
                </div>
                <div>
                    <label>Life span:</label>
                    <input name='lifespanMin' placeholder="Min" min='1' max='100' type='number' required onChange={(e) =>handleChange(e)}/>
                    <input name='lifespanMax' placeholder="Max" min='1' max='100' type='number' required onChange={(e) =>handleChange(e)}/>
                </div>
                <div>
                    <label>Image:</label>
                    <input name='image' placeholder="URL" type='imagen' required onChange={(e) =>handleChange(e)}/>
                </div>
                <div>
                    <label>Temperaments:</label>
                    <select onChange={(e) =>handleTemps(e)}>
                        <option hidden value=''>Choose temperaments</option>
                        {
                            allTemps.map((t) => (
                                <option key={t.id} value={t}>{t.name}</option>
                            ))
                        }
                    </select>
                    <ul>
                            {input.temperament.map((t) =>(
                        <li>
                                <button onClick={() =>handleDelete(t)} >{t.name}</button>
                        </li>
                            ))}
                    </ul>
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
            </form>
        </div>
    )
}