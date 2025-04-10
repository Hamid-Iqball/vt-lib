/* eslint-disable react/prop-types */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CustomSelect from '../components/customSelect'
import TemplateView from './TemplateView'
import TemplatePreview from "./TemplatePreview";



const templateMessageStyle = css`
    display: flex;
    flex-direction: column;
    gap:10px
`

const TemplateMessage = (props) => {

    const {whatsappInitialFormValue,handleChangeTemplate,templateMessageValue,handleInputChangeTemplate , setTemplateMessageValue} = props

  return (
    <div css={templateMessageStyle}>
        <div>

            <CustomSelect 
                placeHolderTitle="Template"
                options={whatsappInitialFormValue?.templates?.map((template) => ({ value: template, label:`${template.category}--${template.name}`}))}
                onChangeHandler={(selectedOption) => handleChangeTemplate(selectedOption)}
                value={templateMessageValue?.template}
            />
        </div>
        {templateMessageValue.template !== null &&
            <div>
                <TemplateView 
                    data={templateMessageValue} 
                    setTemplateMessageValue={setTemplateMessageValue}
                    handleInputChangeTemplate = {handleInputChangeTemplate}
                    whatsappInitialFormValue={whatsappInitialFormValue}
                
                />
            </div>
        }
        {templateMessageValue.template !== null &&
            <div>
                <TemplatePreview 
                    data={templateMessageValue} 
                
                />
            </div>
        }

    </div>
  )
}

export default TemplateMessage