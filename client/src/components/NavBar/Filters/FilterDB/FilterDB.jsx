import React from "react";
import { useDispatch } from "react-redux";
import { filterDB } from "../../../../redux/actions";

export default function FilterDB({setPage, setInput}){
    const dispatch = useDispatch();

    function handleFilterDB(e){
        e.preventDefault();
        dispatch(filterDB(e.target.value));
        setPage(1);
        setInput(1);
    }

    return(
        <div>
            <select onChange={(e) =>handleFilterDB(e)}>
                <option hidden value=''>Choose source</option>
                <option value="all">All</option>
                <option value="api">API</option>
                <option value="database">DataBase</option>
            </select>
        </div>
    )
}