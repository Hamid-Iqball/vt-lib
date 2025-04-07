/** @jsxImportSource @emotion/react */
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { css } from "@emotion/react";


const TemplateView = (props) => {
    const { data, handleInputChangeTemplate } = props
    const headersInput = data.inputLabels?.HEADER
    const bodyInput = data.inputLabels?.BODY
    console.log('data', data)

    const chooseTemplateStyle = css`
      display: flex;
      flex-direction: column; 
      gap: 10px;
    `

    const templateBodyStyle = css`
      display: flex;
      flex-direction: column; 
      gap: 5px;
    `

    
    const templateButtonsStyle = css`
      display: flex;
      flex-direction: row; 
      gap: 5px;
    `

    // Hidden file input
    const hiddenInputStyle = css`
      display: none;
    `;

    // Custom styled button
    const buttonStyle = css`
      background-color: #007bff;
      color: white;
      padding: 5px 10px;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
      border: none;
      outline: none;
      font-size: 13px;
      display: inline-block;
      text-align: center;

      &:hover {
        background-color: #0056b3;
      }
    `;


    
   const renderSection = (section, index) => {
    
    switch (section.type) {
        case "HEADER":
          return (
            <div key={`header-${index}`}>
                
              {headersInput ?
                <div>
                  {headersInput.map((ele, i)=>(
                    <div key={ele}>
                        <CustomInput 
                          placeholder = {`Header Label ${i+1}`}
                          onChange = {(e)=>handleInputChangeTemplate(e, i, 'header')}
                          name={`header-${i}`}
                          value={data.header[i] || ""}
                        />
                    </div>
                  ))}
                </div>
              :
                <div>
                  <label css={buttonStyle}>Upload {section.format}
                     <input type="file" css={hiddenInputStyle} />

                  </label>
                </div>
              }
            </div>
          );

        case "BODY":
          return (
              <div key={`body-${index}`} css={templateBodyStyle}>
                {bodyInput?.map((ele, i)=>(
                  <div key={ele}>
                    <CustomInput 
                      placeholder = {`Body Label ${i+1}`}
                      onChange = {(e)=>handleInputChangeTemplate(e, i, 'body')}
                      name={`body-${i}`}
                      value={data.body[i] || ""}
                    />

                  </div>
                ))}
              </div>
              
          );

        // case "FOOTER":
        //   return (
        //     <div key={`footer-${index}`}>
        //       <p>{section.text}</p>
        //     </div>
        //   );

        case "BUTTONS":
          return (
            <div key={`buttons-${index}`} css={templateButtonsStyle}>
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
    };
  return (
   <div css={chooseTemplateStyle}>
      {data?.template?.value?.template_components.map((section, index) => renderSection(section, index))}
    </div>
  );
  
}

export default TemplateView