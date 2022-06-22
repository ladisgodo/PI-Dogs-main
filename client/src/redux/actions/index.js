import { GET_DOGS, GET_TEMPERAMENTS, GET_DETAILS, CLEAR_PAGE, GET_NAME_DOG } from "./constants";
import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        var json = await axios.get('/dogs');
        return dispatch({
            type: GET_DOGS,
            payload: json.data,
        });
    };
};

export function getTemperaments(){
    return async function(dispatch){
        var json = await axios.get('/temperaments');
        return dispatch({
            type: GET_TEMPERAMENTS,
            payload: json.data,
        });
    };
};

export function getDetails(id){
    return async function(dispatch){
        var json = await axios.get(`/dogs/${id}`);
        return dispatch({
            type: GET_DETAILS,
            payload: json.data,
        });
    };
};

export function clearPage(){
    return{
        type: CLEAR_PAGE
    }
}

export function getNameDogs(name){
    return async function(dispatch){
        var json = await axios.get(`/dogs?name=${name}`);
        return dispatch({
            type: GET_NAME_DOG,
            payload: json.data
        })
    }
}