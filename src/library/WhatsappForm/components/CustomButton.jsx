/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const buttonStule = ({ bgColor = "black", textColor = "white" }) => css`
  
  border:1px solid ${bgColor};
  border-radius: 10px;
  outline: none;
  padding: 5px 10px;
  font-size: 13px;
  background-color: ${bgColor};
  color: ${textColor};
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${textColor};
    color: ${bgColor}
  }


`;

const CustomButton = (props) => {
    const {title, bgColor, textColor, loading=false, icon=false, clickHandler=()=>null, type="button"} = props
  return (
    <>
        <button type={type} css={buttonStule({ bgColor, textColor })} onClick={clickHandler}>{title}</button>
    </>
  )
}

export default CustomButton