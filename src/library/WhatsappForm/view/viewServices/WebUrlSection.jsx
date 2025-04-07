/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import useContactServices from "../../../../hooks/contactHook";

const contactSectionWebsiteContianer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

`
const contactSectionWebsiteList = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

`

const contactSectionWebsiteTitle = css`
  font-size: 18px;
  font-weight: bold;
  
`



const webURLBtn = css`
  display: flex;
  flex-direction: row; 
  align-item: center;
  gap:10px;
`;

const WebUrlSection = () => {

  const {contactList, addURL, removeURL} = useContactServices()
  return (
    <div css={contactSectionWebsiteContianer}>
      {contactList?.webURL.map((ele, i)=>(
        <div css={contactSectionWebsiteList} key={i}>
          <div css={contactSectionWebsiteTitle}>
            <span>Website Url </span>

          </div>
          <CustomInput 
            placeholder="Enter url"
          />
          <CustomInput 
            placeholder="Enter type e.g company,work,personal,Facebook Page, Instagram"
          />
          
        
          <div css={webURLBtn}>
            <CustomButton 
              title="Add website"
              bgColor='#00bfff'
              textColor= "#fff"
              clickHandler={addURL}
            />
            {contactList?.webURL.length > 1 &&
              <CustomButton
                title={`Remove Address ${i+1}`}
                bgColor="#EA322E"
                textColor="#fff"
                clickHandler={()=>removeURL(i)}
              />
            }
          </div>
        </div>
      ))}
    </div>
  )
}

export default WebUrlSection