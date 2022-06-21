import { GET_DOGS, GET_TEMPERAMENTS, GET_DETAILS } from "../actions/constants";

const initialState = {
    dogs: [],
    allDogs: [],
    details: [],
    temperaments: [],
};

const rootReducer = (state = initialState, action) =>{
    switch(action.type){
        case GET_DOGS:  return {
            ...state,
            dogs: action.payload,
            allDogs: action.payload,
        }
        case GET_TEMPERAMENTS: return {
            ...state,
            temperaments: action.payload,
        }
        case GET_DETAILS: return {
            ...state,
            details: action.payload,
        }
        default: return state
    }
};

export default rootReducer;