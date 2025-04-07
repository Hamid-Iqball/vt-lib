import React from 'react'
import './style/whatsappForm.css'
import { FaKey } from 'react-icons/fa6'
import { HiPhone } from 'react-icons/hi2'
import { chooseMessageData } from '../utils/whatsappFormUtils'
import useFormServices from '../Services/whatappFormService'
import TemplateMessage from './TemplateMessage'
import FreeformMessage from './FreeformMessage'
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CustomButton from '../components/CustomButton'
import useMainServices from '../../../hooks/mainHook'
const WhatsappForm = (props) => {
  const {mainColor} = props
  const {whatsappInitialFormValue,handleChangeRadio,handleChangeInput} = useFormServices()
  const {sendWhatsForm} = useMainServices()


  const formButtons = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`


  return (
    <form className='mainContainer'>
        <div className='mainCotnainerInput'>
          <span style={{color: mainColor}} className='mainCotnainerIcon'><FaKey /></span>
          <input placeholder='Past API Hash/Key ' name='hash_key' onChange={handleChangeInput} />
        </div>
        <div className='mainCotnainerInput'>
          <span style={{color: mainColor}} className='mainCotnainerIcon'><HiPhone /></span>
          <input placeholder='+923000000000' name='phone_number' />
        </div>
        
        <div className='chooseMessageContainer'>
          {chooseMessageData?.map((ele)=>(
            <div key={ele.id} className='optionContainer'>
              <input type='radio' name='messageType' value={ele.id} 
                checked={ele.id == whatsappInitialFormValue.messageType}
                onChange={handleChangeRadio}
              />
              <label>{ele.title}</label>
            </div>
          ))}
        </div>
        {whatsappInitialFormValue?.messageType == 1 ? 
          <TemplateMessage 
            // handleChangeTemplate = {handleChangeTemplate}
            whatsappInitialFormValue = {whatsappInitialFormValue}
            // templateMessageValue = {templateMessageValue}
          />
          :
          <FreeformMessage 
            whatsappInitialFormValue ={whatsappInitialFormValue}
            handleChangeRadio = {handleChangeRadio}

          />  
        }
        
        <div css={formButtons}>
          <CustomButton 
            title="Send"
            bgColor='#00bfff'
            textColor= "#fff"
            clickHandler={()=>sendWhatsForm(whatsappInitialFormValue?.messageType)}
          />
          <CustomButton 
            title="Reset"
            bgColor='#00bfff'
            textColor= "#fff"
            // clickHandler={()=>intMsgaddButton(intMsgState.quickBtnType)}
          />
        </div>
    </form>
  )
}

export default WhatsappForm