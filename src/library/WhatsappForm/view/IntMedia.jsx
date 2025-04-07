/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { FaFileVideo } from "react-icons/fa"
import { FaFile, FaRegImage } from "react-icons/fa6"
import CustomTextArea from "../components/CustomTextArea"
import CustomInput from "../components/CustomInput"
import { MdEmojiEmotions } from "react-icons/md"
import useEmojiHook from "../../../hooks/emojiHook"
import EmojiPicker from "emoji-picker-react"
import useIntMMeida from "../../../hooks/intMediaHook"
const interactiveMessageMediaData = [
  { id: 1, icon: <FaRegImage />, accept: "image/*" }, // Opens image files
  { id: 2, icon: <FaFileVideo />, accept: "video/*" }, // Opens video files
  { id: 3, icon: <FaFile />, accept: ".pdf,.doc,.docx" }, // Opens specific document files
]


const intMediaContainer = css`
  margin-top: 10px;
  display: flex; 
  flex-direction: column;
  gap: 10px;
`

const intMediaListContainer = css`
  margin-top: 10px;
  display: flex; 
  align-items: center;
  justify-content: center;
`

const intMediaList = css`
  display: flex; 
  align-item: center;
  gap: 10px;


`

const intMediaListItem = css`
  width: 100px;
  height: 100px;
  border: 1px solid black;
  border-radius: 20px;
  
  span{
    widht: 100%;
    height: 100%;
    display: flex; 
    align-items: center;
    justify-content: center;
    font-size: 40px;
  }
`

const intMediaTextAreaContainer =css`
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

const IntMedia = () => {

  const {toggleEmoji,emojiRef,showEmoji} = useEmojiHook()
  const {intMediaState, intMediaSelectEmoji, handleIntMediaChange, meidaFileInputRefs,handleMediaFileSelect} = useIntMMeida()
  return (
    <div css={intMediaContainer}>
      <div css={intMediaListContainer}>

      <div css={intMediaList}>
        {interactiveMessageMediaData?.map((ele, index)=>(
          <div key={ele.id} css={intMediaListItem}
            onClick={()=>handleMediaFileSelect(index)}
          >
            <span>{ele.icon}</span>
            <input
              type="file"
              accept={ele.accept}
              style={{ display: "none" }}
              ref={(el) => (meidaFileInputRefs.current[index] = el)}
              onChange={handleIntMediaChange}
            />
          </div>
        ))}
      </div>
      </div>
      <div css={intMediaTextAreaContainer}>
        
        <CustomTextArea 
          placeholder='Body Required'
          name="body"
          value={intMediaState.body}
          onChange= {handleIntMediaChange}
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
                  onEmojiClick={(val) => intMediaSelectEmoji(val)}
              />
          </div>
        }
      </div>
      <div>
        <CustomInput 
          placeholder='Footer (Optional)' 
           name="footer"
          value={intMediaState.footer}
          onChange= {handleIntMediaChange}
        />
      </div>
    </div>
  )
}

export default IntMedia

// #1aafd0