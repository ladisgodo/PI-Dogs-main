import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { createDog, getTemperaments } from "../../redux/actions";


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
        temperament: []
        })

    const dispatch = useDispatch();
    const history = useHistory();

    const allTemps = useSelector((state) => state.temperaments);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    };

    function handleSelect(e){
            setInput({
              ...input,
              temperament: [...input.temperament, e.target.value],
            });
            console.log(input.temperament);
    }

    function handleDelete(el){
        setInput({
          ...input,
          temperament: input.temperament.filter((e) => e !== el),
        });
      }

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

    useEffect(() => {
        dispatch(getTemperaments());
      }, [dispatch]);

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
                <div>
                    <label>Temperaments:</label>
                    <select onChange={(e) =>handleSelect(e)} >
                        {
                            allTemps.map((t) =>(
                                <option key={t.id} value={t.name}>{t.name}</option>
                            ))
                        }
                    </select>
                    <div>
                        <label>Selected:</label>
                        {
                            input.temperament.map((e) =>(
                                <button type="button" onClick={() =>handleDelete(e)} key={e} >{e}</button>
                            ))
                        }
                    </div>
                </div>
                <button type="submit" >Crear!</button>
            </form>
        </div>
    )
}