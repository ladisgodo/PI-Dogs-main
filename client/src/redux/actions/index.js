import { GET_DOGS, GET_TEMPERAMENTS, GET_DETAILS } from "./constants";
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