import { useReducer, useRef } from "react"

const intMediaInitialState = {
    file:'',
    body:'',
    footer:''
}

const intMediaReducer = (state, action)=>{

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
        case "SELECT_FILE":
            return {
                ...state,
                file: action.payload // Store selected file in state
            };
        default :
            return state
    }

}
const useIntMMeida = ()=>{

    const [intMediaState, intMediaDispatch] = useReducer(intMediaReducer, intMediaInitialState)
    const meidaFileInputRefs = useRef([]);

    const handleIntMediaChange = (e)=>{
        const { name, value, files } = e.target;
        
        if (files) {
            intMediaDispatch({ type: "SELECT_FILE", payload: files[0] });
        } else {
            intMediaDispatch({ type: "ON_CHANGE", payload: { name, value } });
        }
        
    }

    const intMediaSelectEmoji = (val)=>{
        intMediaDispatch({type: "SELECT_EMOJI", payload: val.emoji})
    }


    const handleMediaFileSelect = (index) => {
        if (meidaFileInputRefs.current[index]) {
            meidaFileInputRefs.current[index].click();
        }
    };


    return {
        intMediaState,
        handleIntMediaChange,
        intMediaSelectEmoji,
        handleMediaFileSelect,
        meidaFileInputRefs
    }


}

export default useIntMMeida