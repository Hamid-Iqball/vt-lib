/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CustomTextArea from "../components/CustomTextArea";
import { MdEmojiEmotions } from "react-icons/md";
import CustomInput from "../components/CustomInput";


const intSendCatalogContainer = css`
    margin-top: 10px;
    display: flex; 
    flex-direction: column;
    gap: 10px; 

`

const intSendCatalogTextArea =css`
 
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

const IntSendCatalog = () => {
  return (
    <div css={intSendCatalogContainer}>
        <div css={intSendCatalogTextArea}>
            
            <CustomTextArea 
            placeholder='Body (Optional)'
            />
            <span>
            <MdEmojiEmotions />
            </span>
        </div>
        <div>
            <CustomInput 
            placeholder="Footer (Optional)"
            />
        </div>
    </div>
  )
}

export default IntSendCatalog