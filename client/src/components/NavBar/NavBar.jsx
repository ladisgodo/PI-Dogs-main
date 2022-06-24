import React from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../redux/actions";
import { Link } from "react-router-dom";
import FilterName from "./Filters/FilterName/FilterName";
import FilterWeight from "./Filters/FilterWeight/FilterWeight";
import FilterTemp from "./Filters/FilterTemp/FilterTemp";

export default function NavBar({setOrder, setPage, setInput}){

    const dispatch = useDispatch();

    function handleReset(e){
        e.preventDefault();
        dispatch(getDogs());
        setPage(1);
        setInput(1);
    }

    return (
        <div>
            <FilterName setOrder={setOrder} />
            <FilterWeight setOrder={setOrder} />
            <FilterTemp setPage={setPage} setInput={setInput} />
            <button onClick={(e) => handleReset(e) } >Reset filters</button>
            <Link to='/create'>
                <button>Create dog</button>
            </Link>
        </div>
    )
}