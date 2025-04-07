/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CustomInput from "../components/CustomInput";
import CustomTextArea from "../components/CustomTextArea";
import { MdEmojiEmotions } from "react-icons/md";
import useEmojiHook from "../../../hooks/emojiHook";
import EmojiPicker from "emoji-picker-react";
import useIntMessages from "../../../hooks/IntMessageHook";
import { calltoActionList, intMessagesButtons } from "../utils/whatsappFormUtils";
import CustomButton from "../components/CustomButton";
import CustomSelect from "../components/customSelect";
import { FaXmark } from "react-icons/fa6";
const intTextContainer = css`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

`


const intTextTextAreaContainer =css`
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

const qucikButtonContainer = css`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`

const callToActionsInputContainer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const callToActionsInput = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  
  `
const callToActionsInputSelect = css`
  
  display: flex;
  flex-direction: column;
  gap: 10px;
  

`
const callToActionsInputSelectContainer = css`
  
  display: flex;
  flex-direction: column;
  gap: 10px;
  

`

const quickButtonInput = css`
  width: 40%;
  flex-direction: column;
  gap: 10px;
`


const quickRepliesContainer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

`


const quickReplyButtonsList = css` 
  display: flex; 
  flex-direction: row;
  align-item: center;
  flex-wrap: wrap;
  gap: 5px; 
  

`
const quickReplyButtonContainer = css` 
  display: flex; 
  flex-direction: row;
  align-items: center;
  gap: 5px; 
  background-color: #1aafd0;
  border-radius: 10px;
  color: #fff;
  padding: 5px 10px;


`

const quickButtonRemove = css` 
  display: flex; 
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  border-radius: 100%;
  background-color: #dc3545;
  cursor: pointer;
  font-size: 10px;
`




const IntText = () => {
  const {toggleEmoji,emojiRef,showEmoji} = useEmojiHook()
  const {intMsgState,handleIntMsgChange, intMsgSelectEmoji,intMsgaddButton, handleSelectActionType,removeQuickReplyButton} = useIntMessages()
  return (
    <div css={intTextContainer}>
      <div>
        <CustomInput 
          placeholder="Enter Header Text"
          name="header"
          value={intMsgState.header}
          onChange= {handleIntMsgChange}
        />
      </div>
      <div css={intTextTextAreaContainer}>
        
        <CustomTextArea 
          placeholder='Body Required'
          name="body"
          value={intMsgState.body}
          onChange= {handleIntMsgChange}
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
      <div>
        <CustomInput 
          placeholder='Footer (Optional)' 
          name="footer"
          value={intMsgState.footer}
          onChange= {handleIntMsgChange}
        />
      </div>
      <div css={qucikButtonContainer}>
      {intMessagesButtons?.map((ele)=>(
          <div key={ele.id} className="optionContainer">
            <input type='radio' name='quickBtnType' value={ele.id} 
              checked={ele.id == intMsgState.quickBtnType}
              onChange= {handleIntMsgChange}
            />
            <label>{ele.title}</label>
          </div>
        ))}
      </div>
      {intMsgState.quickBtnType == 1 ? 
      <div css={callToActionsInputContainer}>
        <span>Create upto two buttons</span>

        <div css={callToActionsInputSelectContainer}>
          {Array.from({ length: intMsgState.callToActions }).map((_, index) => (
            <div key={index} css={callToActionsInputSelect}>
              <CustomSelect 
                placeHolderTitle="Select Action Type"
                options={calltoActionList?.map((list) => ({ value: list.id, label: list.title}))}
                onChangeHandler={(selectedOption) => handleSelectActionType(index, selectedOption)}
                value={intMsgState.selectedActions[index]}
                
              />
              {intMsgState.selectedActions[index] && (
                <div css={callToActionsInput}>
                    {Object.entries(intMsgState.callToActionsInputs[index] || {}).map(([key,value]) => (
                        <CustomInput
                            key={key}
                            onChange={(e) => handleIntMsgChange(e, index, key)}
                            placeholder={`Enter ${key}`} // Show key as placeholder
                           
                        />
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
      : 
      intMsgState.quickBtnType == 2 ? 
      <div css={quickRepliesContainer}>

        <span>Create upto three buttons</span>
        <div css={quickReplyButtonsList}>
          {intMsgState?.quickButtons?.length > 0 &&
            intMsgState?.quickButtons?.map((quickButton, qbIndex)=>(
              <div key={qbIndex } css={quickReplyButtonContainer}>
                  <span>{quickButton.title}</span>
                  <span css={quickButtonRemove} onClick={()=> removeQuickReplyButton(qbIndex)}><FaXmark /></span>
              </div>
            ))
          }
        </div>
        {intMsgState.showQuickReplyButton && 
          <div css={quickButtonInput}>
            <CustomInput 
              placeholder = "Button Text"
              name="buttonText"
              value={intMsgState.buttonText}
              onChange= {handleIntMsgChange}
              
              />
          </div>
        }

      </div>
      :
      null

    }
    {intMsgState.quickBtnType !== '' && 
      <div>
        <CustomButton 
          title="Add Button"
          bgColor='#00bfff'
          textColor= "#fff"
          clickHandler={()=>intMsgaddButton(intMsgState.quickBtnType)}
        />
      </div>
    }

    
      
    </div>
  )
}

export default IntText