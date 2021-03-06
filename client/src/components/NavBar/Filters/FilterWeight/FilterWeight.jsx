import React from "react";
import { useDispatch } from "react-redux";
import { filterWeight } from "../../../../redux/actions";
import s from '../Filter.module.css'

export default function FilterWeight({ setOrder }){

    const dispatch = useDispatch();

    function handleWeight(e){
        e.preventDefault();
        dispatch(filterWeight(e.target.value));
        setOrder(e.target.value);
    }

    return(
        <div>
            <select className={s.filter} onChange={(e) =>handleWeight(e)}>
                <option hidden value=''>Weight order</option>
                <option value='Lower'>Lower</option>
                <option value='Higher'>Higher</option>
            </select>
        </div>
    )
}