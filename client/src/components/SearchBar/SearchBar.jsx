import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../../redux/actions";
import s from './SearchBar.module.css';

export default function SearchBar(){

    const dispatch = useDispatch();
    const [name = '' , setName] = useState();

    function handleSearch(e) {
        e.preventDefault();
        setName('');
        setName(e.target.value)
    }
    function handleEnter(e){
        if (e.hey === "Enter"){
            handleSubmit(e);
        }
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameDogs(name));
        setName('');
    }

    return(
        <div className={s.container} >
            <input type='text' placeholder={'Search a dog...'}
             value={name} onKeyPress={handleEnter} 
             onChange={(e) => handleSearch(e)}
             className={s.input}/>
            <button type='Submit' 
            onClick={(e) =>handleSubmit(e)}
            className={s.btn}>Buscar</button>
        </div>
    )
}