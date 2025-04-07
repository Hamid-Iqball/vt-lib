/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import useContactServices from "../../../../hooks/contactHook";

const contactSectionAddressContainer = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const contactSectionAddressList = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const contactSectionAddressTitle = css`
  font-size: 18px;
  font-weight: bold;
`;


const addressBtn = css`
  display: flex;
  flex-direction: row; 
  align-item: center;
  gap:10px;
`;

const AddressSection = () => {
  const { contactList, addAddress,removeAddress } = useContactServices();


  return (
    <div css={contactSectionAddressContainer}>
      {contactList?.address?.map((ele, index) => (
        <div key={index} css={contactSectionAddressList}>
          <div css={contactSectionAddressTitle}>
            <span>Address {index+1}</span>
          </div>

          <CustomInput placeholder="Enter street" />
          <CustomInput placeholder="Enter city" />
          <CustomInput placeholder="Enter state" />
          <CustomInput placeholder="Enter zip code e.g 94025" />
          <CustomInput placeholder="Enter country" />
          <CustomInput placeholder="Enter country code e.g PK" />
          <CustomInput placeholder="Enter type code e.g Home or Work" />
          <div css={addressBtn}>
            <CustomButton
              title="Add Address"
              bgColor="#00bfff"
              textColor="#fff"
              clickHandler={addAddress}
            />
            {contactList?.address.length > 1 &&
              <CustomButton
                title={`Remove Address ${index+1}`}
                bgColor="#EA322E"
                textColor="#fff"
                clickHandler={()=>removeAddress(index)}
              />
            }

          </div>
        </div>
      ))}

      

      <div>
        <CustomInput type="date" />
      </div>
    </div>
  );
};

export default AddressSection;
