/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import useContactServices from "../../../../hooks/contactHook";


const contactSectionMobileContianer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

`
const contactSectionMobileList = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

`

const contactSectionMobileTitle = css`
  font-size: 18px;
  font-weight: bold;
  
`;

const phoneBtn = css`
  display: flex;
  flex-direction: row; 
  align-item: center;
  gap:10px;
`;

const MobileNoSection = () => {
  const {contactList, addPhone, removePhone} = useContactServices()

  return (
    <div css={contactSectionMobileContianer}>
        {contactList?.phone?.map((ele, i)=>(
          <div css={contactSectionMobileList} key={i}>

            <div css={contactSectionMobileTitle}>
              <span>Mobile No {i+1}</span>
            </div>
            <CustomInput placeholder="Enter phone" /> 
            <CustomInput 
              placeholder="Enter type e.g cell, mobile, main, iPhone, home, work, etc."
            />
            {i==0 && 
              <CustomInput   placeholder="Enter Whatsapp Number e.g 923457890" />
            }
            <div css={phoneBtn}>
              <CustomButton 
                title="Add phone no"
                bgColor='#00bfff'
                textColor= "#fff"
                clickHandler={addPhone}
              />
              {contactList?.phone.length > 1 &&
              <CustomButton
                title={`Remove Phone ${i+1}`}
                bgColor="#EA322E"
                textColor="#fff"
                clickHandler={()=>removePhone(i)}
              />
            }
            </div>
          </div>
        ))}
    </div>
  )
}

export default MobileNoSection