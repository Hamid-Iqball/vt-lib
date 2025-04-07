/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import useContactServices from "../../../../hooks/contactHook";

const contactSectionEmailContianer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

`
const contactSectionEmailList = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

`

const contactSectionEmailTitle = css`
  font-size: 18px;
  font-weight: bold;
  
`

const emailsBtn= css`
  display: flex;
  flex-direction: row; 
  align-item: center;
  gap:10px;
`

const EmailSection = () => {

  const {contactList, addEmail, removeEmail} = useContactServices()

  return (
     <div css={contactSectionEmailContianer}>
      {contactList.emails?.map((ele, i)=>(
      <div key={i} css={contactSectionEmailList}>
        <div css={contactSectionEmailTitle}>
          <span>Email {i+1}</span>
        </div>
        <CustomInput  placeholder="Enter email"  />
        <CustomInput placeholder="Enter type e.g Personal or" />
        <div css={emailsBtn}>
          <CustomButton
            title="Add Email"
            bgColor='#00bfff'
            textColor= "#fff"  
            clickHandler={addEmail}
          />
          {contactList?.emails.length > 1 &&
            <CustomButton
              title={`Remove Email ${i+1}`}
              bgColor="#EA322E"
              textColor="#fff"
              clickHandler={()=>removeEmail(i)}
            />
          }
        </div>
      </div>
      ))}
      

        <CustomInput 
          placeholder="Contact Name"
        />
      
        <CustomInput 
          placeholder="Company Name"
        />
      
        <CustomInput 
          placeholder="Department Name"
        />
      
        <CustomInput 
          placeholder="Department Title"
        />
      
    </div>
  )
}

export default EmailSection