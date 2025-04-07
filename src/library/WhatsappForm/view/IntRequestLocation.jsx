/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MdEmojiEmotions } from "react-icons/md"
import CustomTextArea from "../components/CustomTextArea"
import useEmojiHook from "../../../hooks/emojiHook";
import EmojiPicker from "emoji-picker-react";
import useIntLocation from "../../../hooks/intLocationHook";

const intTextTextAreaContainer =css`
  margin-top: 10px;
  position: relative;

  span{
    position:absolute;
    bottom:5px;
    left:0;
    font-size: 15px !important;
    cursor: pointer;
    padding: 5px; 
    border-radius: 10px;
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out border 0.3s ease-in-out;
    &:hover {
    }
  
  }

`

const standardMessagesIcon = css` 
    font-size: 20px !important;
    cursor: pointer;
    color: #1aafd0;
    padding: 5px; 
    border-radius: 10px;
    border: 1px solid '#fff';
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out border 0.3s ease-in-out;
    &:hover {
        background-color: #1aafd0;
        border: 1px solid '#fff';
        color: '#fff';
    }
    
`

const emojiContainer = css `
    position: absolute;
    top: 73px;
    border
`


const IntRequestLocation = () => {
  const {toggleEmoji,emojiRef,showEmoji} = useEmojiHook()
  const {handleIntLocationChange, intLocationState} = useIntLocation()
  return (
   <div css={intTextTextAreaContainer}>
        
        <CustomTextArea 
          placeholder='Body Required (Required)'
          name="body"
          value={intLocationState.body}
          onChange= {handleIntLocationChange}
        />
        <span
          css={standardMessagesIcon}
          onClick={(e) => {
              e.stopPropagation(); // Prevent triggering the outside click handler
              toggleEmoji();
          }}
        >
          <MdEmojiEmotions />
        </span>
        {showEmoji && 
            <div css = {emojiContainer} ref={emojiRef}>
                <EmojiPicker
                    open={showEmoji}
                    height={400}
                    onEmojiClick={(val) => intMsgSelectEmoji(val)}
                />
            </div>
        }
    </div>
  )
}

export default IntRequestLocation