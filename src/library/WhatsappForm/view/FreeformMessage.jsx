/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { freeFormMessagesData } from '../utils/whatsappFormUtils'
import StandardMessages from './StandardMessages'
import InteractiveMessages from './InteractiveMessages'

const freeFormMessagesContainerStyle = css`
  display:flex;
  flex-direction: column;
  gap: 5px;
`

const freeFormMessagesRadioStyle = css`
  display: flex;
  align-item: center;
  gap: 5px;
`

const FreeformMessage = (props) => {
  const { whatsappInitialFormValue, handleChangeRadio } = props 

  return (
    <div css={freeFormMessagesContainerStyle}>
      <div css ={freeFormMessagesRadioStyle}>
        {freeFormMessagesData?.map((ele)=>(
          <div key={ele.id} className='optionContainer'>
            <input type='radio' name='freeFormMessageType' value={ele.id} 
              checked={ele.id == whatsappInitialFormValue.freeFormMessageType}
              onChange={handleChangeRadio}
            />
            <label>{ele.title}</label>
          </div>
        ))}
      </div>
      <div>
        {whatsappInitialFormValue?.freeFormMessageType == 1 ? 
          <StandardMessages 
            iconColor = '#1aafd0'
            borderColor= '#fff'
          />
          :
          <InteractiveMessages 
            
          />
        }
      </div>
    </div>
  )
}

export default FreeformMessage