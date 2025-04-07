import { useEffect, useRef, useState } from "react"

const useEmojiHook = ()=>{

    const [showEmoji, setShowEmoji] = useState(false)
    const emojiRef = useRef(null)

    const toggleEmoji = ()=>{
        setShowEmoji(!showEmoji)
    }



    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (emojiRef.current && !emojiRef.current.contains(e.target)) {
                setShowEmoji(false)
            }
            
        
        };
            
        document.addEventListener("click", handleOutsideClick);
        return () => {
          document.removeEventListener("click", handleOutsideClick);
        };
      }, []); 


    return{
        toggleEmoji, showEmoji,emojiRef
    }

}


export default useEmojiHook