import React from "react";

export default function Cards({name, img, weightMin, weightMax, temperaments}){
    return (
        <div>
            <h1>Name: {name}</h1>
            <img src={img} alt={name}/>
            <h1>WeightMin: {weightMin} weightMax: {weightMax} </h1>
            <h1>Temperaments: {temperaments}</h1>
        </div>
    );
}