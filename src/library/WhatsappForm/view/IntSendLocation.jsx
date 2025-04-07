/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CustomInput from "../components/CustomInput";
import useIntLocation from "../../../hooks/intLocationHook";

const intSendLocationContainer = css`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

`

const IntSendLocation = () => {

  const {intLocationState, handleIntLocationChange} = useIntLocation()
  return (
    <div css={intSendLocationContainer}>
      <div>
        <CustomInput 
          placeholder="Type your business name"
          name="busineesName"
          value={intLocationState.busineesName}
          onChange= {handleIntLocationChange}
        />
      </div>
      <div>
        <CustomInput 
          placeholder="Type your address (optional)"
          name="address"
          value={intLocationState.address}
          onChange= {handleIntLocationChange}
        />
      </div>
      <div>
        <CustomInput 
          placeholder="Enter Latitude"
          name="latitude"
          value={intLocationState.latitude}
          onChange= {handleIntLocationChange}
        />
      </div>
      <div>
        <CustomInput 
          placeholder="Enter Longitude"
          name="longitude"
          value={intLocationState.longitude}
          onChange= {handleIntLocationChange}
        />
      </div>
    </div>
  )
}

export default IntSendLocation