import React from "react";
import { useDispatch } from "react-redux";
import { filterName } from "../../../../redux/actions";

export default function FilterName({ setOrder }){

    const dispatch = useDispatch();

    function handleName(e){
        e.preventDefault();
        dispatch(filterName(e.target.value));
        setOrder(e.target.value);
    }

    return (
        <div>
            <select onChange={(e) => handleName(e)}>
                <option hidden value=''>Alphabetical order</option>
                <option value='A-Z'>A-Z</option>
                <option value='Z-A'>Z-A</option>
            </select>
        </div>
    )
}