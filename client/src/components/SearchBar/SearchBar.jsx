import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDogs } from "../../redux/actions";
import s from './SearchBar.module.css';

export default function SearchBar({setPage, setInput}){

    const dispatch = useDispatch();
    const [name = '' , setName] = useState();

    function handleSearch(e) {
        e.preventDefault();
        setName('');
        setName(e.target.value)
    }
    function handleEnter(e){
        if (e.key === "Enter"){
            handleSubmit(e);
        }
    }
    function handleSubmit(e){
        e.preventDefault();
        if(!name){
            alert('Please, enter a name')
        } else{
            dispatch(getNameDogs(name));
            setName('');
            setPage(1);
            setInput(1);
        }
    }

    return(
        <div className={s.container}>
            <div className={s.container2}>
                <input type='text' placeholder={'Search a dog...'}
                value={name} onKeyPress={handleEnter} 
                onChange={(e) => handleSearch(e)}
                className={s.input}/>
                <button type='Submit' 
                onClick={(e) =>handleSubmit(e)}
                className={s.btn}>Search</button>
            </div>
        </div>
    )
}