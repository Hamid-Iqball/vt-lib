/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const inputStyle = ({ borderColor = "gray", focusColor = "blue" }) => css`
  border: 1px solid ${borderColor};
  border-radius: 5px;
  outline: none;
  padding: 5px 10px;
  width: 100%;
  transition: border 0.2s ease-in-out;

  &:focus {
    border: 1px solid ${focusColor}; // Dynamic focus color
  }

  &::placeholder {
    color: ${borderColor};
    font-size: 13px;


  }
`;

const CustomInput = (props) => {
    const { borderColor, focusColor, placeholder, onChange, name, value, type="text" } = props
  return <input css={inputStyle({ borderColor, focusColor })} placeholder={placeholder}  onChange={onChange} name={name} value ={value} type={type} />;
};

export default CustomInput;
