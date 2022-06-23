import React from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions";
import FilterName from "./Filters/FilterName/FilterName";
import FilterWeight from "./Filters/FilterWeight/FilterWeight";
import FilterTemp from "./Filters/FilterTemp/FilterTemp";

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
            <FilterTemp />
            <button onClick={(e) => handleReset(e) } >Reset filters</button>
        </div>
    )
}