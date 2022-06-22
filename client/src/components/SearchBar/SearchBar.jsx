import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../../redux/actions";

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
        <div>
            <input type='text' placeholder={'Search a dog...'}
             value={name} onKeyPress={handleEnter} 
             onChange={(e) => handleSearch(e)}/>
            <button type='Submit' onClick={(e) =>handleSubmit(e)} >Buscar</button>
        </div>
    )
}