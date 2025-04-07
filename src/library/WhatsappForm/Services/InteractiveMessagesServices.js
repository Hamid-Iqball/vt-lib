import { useReducer } from "react";

const initialState = {
    type: {value: 2, label:'Text'}
}

const reducer = (state, action)=>{
    switch (action.type) {
        case "TOGGLE_TYPE":
            return {...state, type: action.payload}
    
        default:
            return state;
    }
}

const useInteractiveMessagesServices = ()=>{

    const [state, dispatch] = useReducer(reducer, initialState)

    const handleSelectInteractiveMessage = (value, inputType) =>{

        const caseType = inputType
        switch (caseType) {
            case 'messageType':
                   dispatch({type:'TOGGLE_TYPE', payload:value}) 
                break;
        
            default:
                break;
        }
    }



    return {state,handleSelectInteractiveMessage}




}


export default useInteractiveMessagesServices