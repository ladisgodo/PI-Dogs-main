import React from "react";
import { useDispatch } from "react-redux";
import FilterName from "./Filters/FilterName/FilterName";

export default function NavBar({setOrder}){

    const dispatch = useDispatch();

    return (
        <div>
            <FilterName setOrder={setOrder} />
        </div>
    )
}