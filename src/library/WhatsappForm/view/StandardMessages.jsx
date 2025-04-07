/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { MdAttachFile, MdEmojiEmotions } from 'react-icons/md'
import useStandardMessagesServices from "../Services/standardMessagesServices";
import EmojiPicker from "emoji-picker-react";
import { attachementData } from "../utils/whatsappFormUtils";

const standardMessagesContainer = css `
    display: flex;
    flex-direction: column;
    gap: 5px;

    span {
        font-size: 14px;
    }
`

const standardMessagesContentContainer = css `
    display: flex;
    flex-direction: row;
    gap: 5px;
    position: relative;
`
const standardMessagesIcons =css` 
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;
    
`
const standardMessagesIcon = ({iconColor, borderColor})=> css` 
    font-size: 20px !important;
    cursor: pointer;
    color: ${iconColor};
    padding: 5px; 
    border-radius: 10px;
    border: 1px solid ${borderColor};
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out border 0.3s ease-in-out;
    &:hover {
        background-color: ${iconColor};
        border: 1px solid ${borderColor};
        color: ${borderColor};
    }
    
`

const emojiContainer = css `
    position: absolute;
    top: 30px;
    border
`
const attachementContainer = css `
    position: absolute;
    top: 70px;
    border: 1px solid gray;
    height: 200px;
    width: 150px;
    font-size: 13px;
    background: white; 
    z-index: 10;
`


const attachementList = css`
    display: flex; 
    flex-direction: column;
    gap: 2px;
    border-radius: 10px;

`

const attachementListItem = css`
    text: black !important;
    cursor: pointer;
    padding: 5px 10px;

    &:hover{
        text: black !important;
        background-color: gray;

    }

`


const standardMessageTextContainer = css`
    textarea{
        border: 1px solid gray; 
        border-radius: 10px;
        padding: 5px 10px;

        &::placeholder{
            font-size: 12px;
        }
    }
`


const StandardMessages = (props) => {
    const {iconColor,borderColor} = props
    const {state, toggleEmoji, toggleAttachment,emojiRef,attachmentRef,handleChangeStandardMessage, freeFormSelectEmoji} = useStandardMessagesServices()
    
  return (
    <div css = {standardMessagesContainer}>
        <span>Text Body</span>
        <div css = {standardMessagesContentContainer}>
            <div css={standardMessagesIcons}>
                <span 
                    css={standardMessagesIcon({iconColor, borderColor})}
                    
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the outside click handler
                        toggleEmoji();
                    }}
                >
                    <MdEmojiEmotions />
                    
                </span>
                {state.emoji && 
                    <div css = {emojiContainer} ref={emojiRef}>
                        <EmojiPicker
                            open={state.emoji}
                            height={400}
                            onEmojiClick={(val) => freeFormSelectEmoji(val)}
                        />
                    </div>
                }
                <span css={standardMessagesIcon({iconColor, borderColor})}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the outside click handler
                        toggleAttachment();
                    }}
                >
                    <MdAttachFile />
                </span>
            </div>
            {state.attachement && 
            <div css = {attachementContainer} ref={attachmentRef}>
                <div css={attachementList}>
                {attachementData?.map((ele)=>(
                    <span key={ele.id} css ={attachementListItem}>
                        {ele.title}
                    </span>
                ))}
                </div>
            </div>
            }
            <div css={standardMessageTextContainer}>

                <textarea 
                    placeholder="Enter a Text Message you want to send"
                    name="content"
                    onChange={handleChangeStandardMessage}
                    value={state.content}
                
                />
            </div>
        </div>
        <div>

        </div>
    </div>
  )
}

export default StandardMessages