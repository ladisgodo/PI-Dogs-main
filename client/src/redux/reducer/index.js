import { GET_DOGS, GET_TEMPERAMENTS,
         GET_DETAILS, CLEAR_PAGE, 
         GET_NAME_DOG, FILTER_NAME,
         FILTER_WEIGHT, FILTER_TEMP,
         FILTER_DB } from "../actions/constants";

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
            const filterName = action.payload === 'A-Z' ? 
            state.dogs.sort((dog1, dog2) => dog1.name.localeCompare(dog2.name)) :
            state.dogs.sort((dog1, dog2) => dog2.name.localeCompare(dog1.name)) ;
            return{
                ...state,
                dogs: filterName
            }
        case FILTER_WEIGHT:
            const filterWeight = action.payload === 'Higher' ?
            state.dogs.sort((dog1, dog2) => {
                if(dog1.name === "Olde English Bulldogge") dog1.weightMin = 27;
                else if(dog2.name === "Olde English Bulldogge") dog2.weightMin = 27;
                return (parseInt(dog2.weightMin)) - (parseInt(dog1.weightMin))
            }) :
            state.dogs.sort((dog1, dog2) => {
                if(dog1.name === "Olde English Bulldogge") dog1.weightMin = 27;
                else if(dog2.name === "Olde English Bulldogge") dog2.weightMin = 27;
                return (parseInt(dog1.weightMin)) - (parseInt(dog2.weightMin))
            });
            return{
                ...state,
                dogs: filterWeight
            }
        case FILTER_TEMP:
            const filterTemp = action.payload === "all" ? 
            state.allDogs :
            state.allDogs.filter((d) => {
                return d.temperament.split(", ").includes(action.payload)
            })
            return{
                ...state,
                dogs: filterTemp
            }
        case FILTER_DB:
            const database = action.payload === 'database' ? 
            state.allDogs.filter((d) => d.userCreated)
            : state.allDogs.filter((d) => !d.userCreated)
            return{
                ...state,
                dogs: action.payload === "all" ? state.allDogs : database
            }
        default: return state
    }
};

export default rootReducer;