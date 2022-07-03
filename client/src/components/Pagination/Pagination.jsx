import React from "react";
import s from './Pagination.module.css'

export default function Pagination({page, setPage, max, input, setInput}){

    function nextPage(){
        setPage(page + 1);
        setInput(input + 1);
    }

    function prevPage(){
        setPage(page - 1);
        setInput(input - 1);
    }

    function firstPage(){
        setInput(1);
        setPage(1);
    }

    function lastPage(){
        setInput(max);
        setPage(max);
    }
    
    return(
        <div className={s.container}>
            <div className={s.container2}>
                <button onClick={(e) => firstPage()}
                disabled={page <= 1}
                className={s.btn}>First page</button>
                <button onClick={(e) =>prevPage()}
                disabled={page <= 1}
                className={s.btn}>Previous</button>
                    <p className={s.text}>{page} de {max}</p>
                <button onClick={(e) =>nextPage()}
                disabled={page >= max}
                className={s.btn}>Next</button>
                <button onClick={(e) => lastPage()}
                disabled={page >= max}
                className={s.btn}>Last page</button>
            </div>
        </div>
    )
}