import { GET_DOGS, GET_TEMPERAMENTS,
         GET_DETAILS, CLEAR_PAGE, 
         GET_NAME_DOG, FILTER_NAME } from "../actions/constants";

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
        case CLEAR_PAGE:
            return{
                ...state,
                details: []
            }
        case GET_NAME_DOG:
            return{
                ...state,
                dogs: action.payload
            }
        case FILTER_NAME:
            const filterDogs = action.payload === 'A-Z' ? 
            state.dogs.sort((dog1, dog2) => dog1.name.localeCompare(dog2.name)) :
            state.dogs.sort((dog1, dog2) => dog2.name.localeCompare(dog1.name)) ;
            return{
                ...state,
                dogs: filterDogs
            }
        default: return state
    }
};

export default rootReducer;