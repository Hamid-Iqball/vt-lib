/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/** @jsxImportSource @emotion/react */
import axios from 'axios';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { css } from "@emotion/react";
import { whatsappFormInstance } from '../model/base';

const TemplateView = (props) => {
    const { data, handleInputChangeTemplate, whatsappInitialFormValue, setTemplateMessageValue } = props;
    const headersInput = data.inputLabels?.HEADER;
    const bodyInput = data.inputLabels?.BODY;

    
    const chooseTemplateStyle = css`
      display: flex;
      flex-direction: column; 
      gap: 10px;
    `;

    const templateBodyStyle = css`
      display: flex;
      flex-direction: column; 
      gap: 5px;
    `;

    const templateButtonsStyle = css`
      display: flex;
      flex-direction: row; 
      gap: 5px;
    `;

    const hiddenInputStyle = css`
      display: none;
    `;

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

    //  Media upload handler (This fucntion upload our media files (image,video,pdf to the elphent))
    const handleMediaUpload = async (e, format) => {
      const file = e.target.files?.[0];
      if (!file) {
        console.error("No file selected");
        return;
      }
    
      const accountKey = whatsappInitialFormValue.hash_key;
      const formData = new FormData();
    
      // Append the file and the account key to formData
      formData.append("file", file);
      formData.append("account_key", accountKey);
    
      try {
        console.log("Sending request to upload file...");
  
        const response = await whatsappFormInstance.post(
          "https://spext.veevotech.com/bk-service-api/whatsapp/media_upload",
          formData, 
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }
        );
      
        const uploadedUrl = response?.data?.FILE_URL;
        if (!uploadedUrl) {
          throw new Error("Upload failed, media_url not returned");
        }
  
        setTemplateMessageValue(prev => ({
          ...prev,
          media_url: uploadedUrl
        }));
    
      } catch (err) {
    
        console.error("Media upload failed:", err);
        
      }
    };
    
    
    

    const renderSection = (section, index) => {
      switch (section.type) {
        case "HEADER":
          return (
            <div key={`header-${index}`}>
              {headersInput ? (
                <div>
                  {headersInput.map((ele, i) => (
                    <div key={ele}>
                      <CustomInput
                        placeholder={`Header Label ${i + 1}`}
                        onChange={(e) => handleInputChangeTemplate(e, i, 'header')}
                        name={`header-${i}`}
                        value={data.header[i] || ""}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <label css={buttonStyle}>
                    Upload {section.format}
                    <input
                      type="file"
                      css={hiddenInputStyle}
                      onChange={(e) => handleMediaUpload(e, section.format)}
                    />
                  </label>
                  {data.media_url && (
                    <p style={{ fontSize: '12px', marginTop: '5px' }}>Uploaded URL: {data.media_url}</p>
                  )}
                </div>
              )}
            </div>
          );

        case "BODY":
          return (
            <div key={`body-${index}`} css={templateBodyStyle}>
              {bodyInput?.map((ele, i) => (
                <div key={ele}>
                  <CustomInput
                    placeholder={`Body Label ${i + 1}`}
                    onChange={(e) => handleInputChangeTemplate(e, i, 'body')}
                    name={`body-${i}`}
                    value={data.body[i] || ""}
                  />
                </div>
              ))}
            </div>
          );

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
};

export default TemplateView;
