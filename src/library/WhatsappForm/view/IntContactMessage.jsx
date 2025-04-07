
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import AddressSection from "./viewServices/AddressSection";
import EmailSection from "./viewServices/EmailSection";
import MobileNoSection from "./viewServices/MobileNoSection";
import WebUrlSection from "./viewServices/WebUrlSection";
const intContactMessageContainer = css`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

`

const IntContactMessage = () => {
  return (
    <div css={intContactMessageContainer}>
        <AddressSection />
        <EmailSection />
        <MobileNoSection />
        <WebUrlSection />
    </div>
  )
}

export default IntContactMessage