/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import CustomButton from "../components/CustomButton";


const chooseTemplateStyle = css`
    display: flex;
    flex-direction: column; 
    gap: 10px;
    padding: 4px 10px;
    border: 1px solid gray;
    border-radius: 10px;
`

const templateViewBodyStyle = css `

    span{
        font-size: 13px;
        color: gray;
    }

`

const templateViewButtonsStyle = css`
    display: flex;
    flex-direction: row; 
    gap: 5px;
`

const renderSection = (section, index) => {

    console.log('sections', section)
    
    switch (section.type) {
        case "BODY":
            return (
              <div key={`body-${index}`} css={templateViewBodyStyle}>
                    
                <span>{section.text}</span>
                  
              </div>
              
            );
        case "BUTTONS":
          return (
            <div key={`buttons-${index}`} css={templateViewButtonsStyle}>
              {section.buttons?.map((button, btnIndex) => (
                <CustomButton
                  key={`button-${index}-${btnIndex}`}
                  title={button.text}
                
                />
                  
              ))}
            </div>
          );

        default:
          return null;
    }
}

const TemplatePreview = (props) => {
    const { data } = props
    // console.log("dataaaaa",data)
  return (
    <div css={chooseTemplateStyle}>
      {data?.template?.value?.template_components.map((section, index) => renderSection(section, index))}
    </div>
  )
}

export default TemplatePreview