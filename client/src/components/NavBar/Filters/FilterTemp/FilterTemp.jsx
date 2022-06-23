import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterTemperaments } from "../../../../redux/actions";

export default function FilterTemp() {

    const dispatch = useDispatch();
    const allTemps = useSelector((state) => state.temperaments);

    function handleTemp(e) {
        e.preventDefault();
        dispatch(filterTemperaments(e.target.value));
    }

    return(
        <div>
            <select onChange={(e) =>handleTemp(e)}>
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