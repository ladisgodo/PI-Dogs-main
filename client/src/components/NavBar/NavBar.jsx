import React from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions";
import FilterName from "./Filters/FilterName/FilterName";
import FilterWeight from "./Filters/FilterWeight/FilterWeight";

export default function NavBar({setOrder}){

    const dispatch = useDispatch();

    function handleReset(e){
        e.preventDefault();
        dispatch(getDogs());
    }

    return (
        <div>
            <FilterName setOrder={setOrder} />
            <FilterWeight setOrder={setOrder} />
            <button onClick={(e) => handleReset(e) } >Reset filters</button>
        </div>
    )
}