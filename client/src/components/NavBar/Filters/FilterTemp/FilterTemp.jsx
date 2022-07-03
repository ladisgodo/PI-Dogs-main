import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterTemperaments } from "../../../../redux/actions";
import s from '../Filter.module.css'

export default function FilterTemp({setPage, setInput}) {

    const dispatch = useDispatch();
    const allTemps = useSelector((state) => state.temperaments);

    function handleTemp(e) {
        e.preventDefault();
        dispatch(filterTemperaments(e.target.value));
        setPage(1);
        setInput(1);
    }

    return(
        <div>
            <select className={s.filter} onChange={(e) =>handleTemp(e)}>
                <option hidden value=''>Choose temperaments</option>
                <option value="all" >All</option>
                {
                    allTemps.map((t) => (
                        <option key={t.id} value={t.name} >{t.name}</option>
                    ))
                }
            </select>
        </div>
    )
}