import React from "react";
import FilterName from "./Filters/FilterName/FilterName";
import FilterWeight from "./Filters/FilterWeight/FilterWeight";

export default function NavBar({setOrder}){

    return (
        <div>
            <FilterName setOrder={setOrder} />
            <FilterWeight setOrder={setOrder} />
        </div>
    )
}