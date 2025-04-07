import { useReducer } from "react"

const intMsgInitialState = {
    header:'',
    body:'',
    footer:'',
    quickBtnType:'',
    callToActions:0,
    selectedActions:[],
    callToActionsInputs:[],
    showQuickReplyButton:false, 
    quickButtons:[],
    buttonText:'',

}

const intMsgReducer = (state, action)=>{

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

        case "ADD_CALL_TO_ACTION":
            return {
                ...state,
                callToActions: state.callToActions + 1
            };
        case "SELECT_CALL_TO_ACTION":
            return{
                ...state, 
                selectedActions: {
                    ...state.selectedActions,
                    [action.payload.index]: action.payload.value, // Update specific index
                },
                callToActionsInputs:[
                    ...state.callToActionsInputs,
                    {lable: '',url:''}
                ]
            }

        case "TOGGLE_ADD_QUICK_REPLY":
            return {
                ...state, 
                showQuickReplyButton: state.quickButtons?.length === 3 ? false :true, 
            }

        case "ADD_QUICK_REPLY":
            return{
                ...state, 
                quickButtons: (state.quickButtons?.length > 0  || state.quickButtons?.length < 3) 
                    ? [...state.quickButtons, { title: state.buttonText }] 
                    : [...state.quickButtons],  // Keep the existing array if limit reached
                buttonText: ''

                
            }
        case "REMOVE_REPLY_BUTTON":
            return{
                ...state,
                quickButtons: state.quickButtons.filter((___, i)=> i !== action.payload)
            }

        case 'UPDATE_CALL_TO_ACTION_INPUT':
            return {
                ...state,
                callToActionsInputs: state.callToActionsInputs.map((item, i) =>
                    i === action.payload.index
                        ? { ...item, [action.payload.key]: action.payload.value }
                        : item
                )
            };

        default :
            return state
    }

}
const useIntMessages = ()=>{

    const [intMsgState, intMsgDispatch] = useReducer(intMsgReducer, intMsgInitialState)

    const handleIntMsgChange = (event, index = null, key = null) => {
        const { name, value } = event.target;
    
        if (index !== null && key !== null) {
            // Updating callToActionsInputs
            intMsgDispatch({
                type: 'UPDATE_CALL_TO_ACTION_INPUT',
                payload: { index, key, value }
            });
        } else {
            // Updating single input (header)
            intMsgDispatch({type: "ON_CHANGE", payload: {name: name, value: value}})
        }
    };

    const intMsgSelectEmoji = (val)=>{
        intMsgDispatch({type: "SELECT_EMOJI", payload: val.emoji})
    }



    const intMsgaddButton = (actionType)=>{
        if(actionType == 1){
            intMsgDispatch({type: "ADD_CALL_TO_ACTION"})
        }
        else if(actionType == 2){
            intMsgDispatch({type: "TOGGLE_ADD_QUICK_REPLY"})

            if(intMsgState.buttonText !== ''){
                intMsgDispatch({type: "ADD_QUICK_REPLY"})
            }

        }
    }

    const handleSelectActionType = (index, selectedOption)=>{
        intMsgDispatch({type: "SELECT_CALL_TO_ACTION", payload:{index: index, value: selectedOption}})
    }



    const removeQuickReplyButton = (index)=>{

        intMsgDispatch({type: "REMOVE_REPLY_BUTTON", payload:index})
    }




    return {
        intMsgState,
        handleIntMsgChange,
        intMsgSelectEmoji,
        intMsgaddButton,
        handleSelectActionType,
        removeQuickReplyButton
    }


}

export default useIntMessages