/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */

import './style/whatsappForm.css';
import { FaKey } from 'react-icons/fa6';
import { HiPhone } from 'react-icons/hi2';
import { chooseMessageData } from '../utils/whatsappFormUtils';
import useFormServices from '../Services/whatappFormService';
import TemplateMessage from './TemplateMessage';
import FreeformMessage from './FreeformMessage';
import { css } from "@emotion/react";
import CustomButton from '../components/CustomButton';
import useMainServices from '../../../hooks/mainHook';
import useTemplateMessageServices from '../Services/templateMessageServices';

const WhatsappForm = (props) => {
  const { mainColor } = props;
  const { whatsappInitialFormValue, handleChangeRadio, handleChangeInput } = useFormServices();

 
  const {
    templateMessageValue,
    handleChangeTemplate,
    handleInputChangeTemplate,
    setTemplateMessageValue
  } = useTemplateMessageServices();


  console.log(templateMessageValue)
  const { sendWhatsForm } = useMainServices({
    whatsappInitialFormValue,
    templateMessageValue
  });

  const formButtons = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  `;

  return (
    <form className='mainContainer'>
      <div className='mainCotnainerInput'>
        <span style={{ color: mainColor }} className='mainCotnainerIcon'><FaKey /></span>
        <input placeholder='Paste API Hash/Key ' name='hash_key' onChange={handleChangeInput} />
      </div>
      <div className='mainCotnainerInput'>
        <span style={{ color: mainColor }} className='mainCotnainerIcon'><HiPhone /></span>
        <input placeholder='+923000000000' name='phone_number' onChange={handleChangeInput} />
      </div>

      <div className='chooseMessageContainer'>
        {chooseMessageData?.map((ele) => (
          <div key={ele.id} className='optionContainer'>
            <input
              type='radio'
              name='messageType'
              value={ele.id}
              checked={ele.id == whatsappInitialFormValue.messageType}
              onChange={handleChangeRadio}
            />
            <label>{ele.title}</label>
          </div>
        ))}
      </div>

      {whatsappInitialFormValue?.messageType == 1 ? (
        <TemplateMessage
          whatsappInitialFormValue={whatsappInitialFormValue}
          templateMessageValue={templateMessageValue} 
          setTemplateMessageValue={setTemplateMessageValue}
          handleChangeTemplate={handleChangeTemplate}
          handleInputChangeTemplate={handleInputChangeTemplate}
        />
      ) : (
        <FreeformMessage
          whatsappInitialFormValue={whatsappInitialFormValue}
          handleChangeRadio={handleChangeRadio}
        />
      )}

      <div css={formButtons}>
        <CustomButton
          title="Send"
          bgColor='#00bfff'
          textColor="#fff"
          clickHandler={() => sendWhatsForm(whatsappInitialFormValue?.messageType)}
        />
        <CustomButton
          title="Reset"
          bgColor='#00bfff'
          textColor="#fff"
          // clickHandler={...}
        />
      </div>
    </form>
  );
};

export default WhatsappForm;
