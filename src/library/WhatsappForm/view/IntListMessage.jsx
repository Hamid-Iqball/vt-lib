/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CustomInput from "../components/CustomInput";
import CustomTextArea from "../components/CustomTextArea";
import { MdEmojiEmotions } from "react-icons/md";
import ListSection from "./viewServices/ListSection";
import useListServices from "../../../hooks/listHook";
import useEmojiHook from "../../../hooks/emojiHook";
import EmojiPicker from "emoji-picker-react";

const intListContainer = css`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

`

const intListBodyContainer =css`
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




const emojiContainer = css `
    position: absolute;
    top: 73px;
    border
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



const IntListMessage = () => {

    const {listState, handleSectionsButtons,handleRemoveRowList,handleChangeListInputs} = useListServices()
    const {toggleEmoji,emojiRef,showEmoji} = useEmojiHook()

  return (
    <div css={intListContainer}>
      <div>
        <CustomInput 
          placeholder="Enter Header Text"
        />
      </div>
      <div css={intListBodyContainer}>
        
        <CustomTextArea 
          placeholder='Body (Required)'
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
                      // onEmojiClick={(val) => selectEmoji(val)}
                  />
              </div>
          }
      </div>
      <div>
        <CustomInput 
          placeholder="Footer (Optional)"
        />
      </div>
      <div>
        <CustomInput 
          placeholder="Action Button (Required)"
        />
      </div>
      <div>
        <ListSection 
            listState= {listState}
            handleSectionsButtons= {handleSectionsButtons}
            handleRemoveRowList= {handleRemoveRowList}
            handleChangeListInputs= {handleChangeListInputs}
        />
      </div>
      
    </div>
  )
}

export default IntListMessage