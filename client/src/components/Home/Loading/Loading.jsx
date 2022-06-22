import React from "react";

export default function Loading({ setLoading }){
    return(
        <div>
            <h1>Cargando...</h1>
            {
                setTimeout(() =>{
                    setLoading(false)
                }, 1500)
            }
        </div>
    )
}