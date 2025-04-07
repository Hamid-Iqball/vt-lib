import { useEffect, useReducer, useRef } from "react";

const initialState = {
  emoji: false,
  attachement: false,
  content: "",

};

const reducer = (state, action) => {
  switch (action.type) {
    case "EMOJI_TOGGLE":
      return { ...state, emoji: !state.emoji, attachement: false };
    case "EMOJI_HIDE":
      return { ...state, emoji: false };
    case "TOGGLE_ATTACHMENT":
      return { ...state, attachement: !state.attachement, emoji: false };
    case "HIDE_ATTACHMENT":
      return { ...state, attachement: false };
      case "ON_CHANGE": 
        return{
            ...state,
            [action.payload.name]: action.payload.value
        };
      case "SELECT_EMOJI": 
        return{
            ...state,
                content: state.content + action.payload
        };
    default:
      return state;
  }
};
const useStandardMessagesServices = ()=>{

  const [state, dispatch] = useReducer(reducer, initialState);

  const emojiRef = useRef(null);
  const attachmentRef = useRef(null);

  const toggleEmoji = () => dispatch({ type: "EMOJI_TOGGLE" });
  const hideEmoji = () => dispatch({ type: "EMOJI_HIDE" });
  const toggleAttachment = () => dispatch({ type: "TOGGLE_ATTACHMENT" });
  const hideAttachment = () => dispatch({ type: "HIDE_ATTACHMENT" });

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        hideEmoji();
      }
      if (attachmentRef.current && !attachmentRef.current.contains(e.target)) {
        hideAttachment();
    }

  };

   
        
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [state.emoji, state.attachement]); 



    const handleChangeStandardMessage = (e)=>{
      const {name, value} = e.target
      dispatch({type: "ON_CHANGE", payload: {name: name, value: value}})

    }


    const freeFormSelectEmoji = (val)=>{
        dispatch({type: "SELECT_EMOJI", payload: val.emoji})
    }


    return { state, toggleEmoji, toggleAttachment,emojiRef,attachmentRef,handleChangeStandardMessage,freeFormSelectEmoji };


}


export default useStandardMessagesServices