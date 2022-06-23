import React, { useState } from "react";
import s from './Pagination.module.css'

export default function Pagination({page, setPage, max, input, setInput}){

    function nextPage(){
        setInput(input + 1);
        setPage(page + 1);
    }

    function prevPage(){
        setInput(input - 1);
        setPage(page - 1);
    }

    function keyDown(e){
        if(e.key === 'Enter'){
            setPage(parseInt(e.target.value))
            if(parseInt(e.target.value) < 1 || parseInt(e.target.value) > max || isNaN(parseInt(e.target.value))){
                setPage(1);
                setInput(1);
            } else {
                setPage(parseInt(e.target.value));
            }
        }
    }

    function onChange(e){
        setInput (e.target.value);
    }

    return(
        <div className={s.container}>
            <button onClick={(e) =>prevPage()}
            disabled={page <= 1}>Previous</button>
            <input onKeyDown={(e) =>keyDown(e)} 
            name='page' autoComplete="off" 
            type='text' className={s.input} 
            value={input} onChange={(e) => onChange(e)}/>
            <p className={s.text}>de {max}</p>
            <button onClick={(e) =>nextPage()}
            disabled={page >= max}>Next</button>
        </div>
    )
}