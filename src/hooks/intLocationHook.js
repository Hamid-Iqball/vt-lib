import { useReducer } from "react"

const intLocationInitialState = {
   
    body:'',
    busineesName:'',
    address:'',
    latitude:'', 
    longitude:''
}

const intLocationReducer = (state, action)=>{

    switch(action.type){
        case "ON_CHANGE": 
            return{
                ...state,
                [action.payload.name]: action.payload.value

            };

        case "SELECT_EMOJI": 
            return{
                ...state,
                    body: state.body + action.payload
            };
        default :
            return state
    }

}
const useIntLocation = ()=>{

    const [intLocationState, intLocationDispatch] = useReducer(intLocationReducer, intLocationInitialState)

    const handleIntLocationChange = (e)=>{
        const {name, value} = e.target
        intLocationDispatch({type: "ON_CHANGE", payload: {name: name, value: value}})
    }

    const intLocationSelectEmoji = (val)=>{
        intLocationDispatch({type: "SELECT_EMOJI", payload: val.emoji})
    }


    return {
        intLocationState,
        handleIntLocationChange,
        intLocationSelectEmoji
    }


}

export default useIntLocation
