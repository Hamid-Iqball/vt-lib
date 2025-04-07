/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { sectionData } from '../../utils/whatsappFormUtils'
import CustomButton from '../../components/CustomButton'
import CustomInput from "../../components/CustomInput";


const listSectionMainContainer = css`
  display: flex; 
  flex-direction: column; 
  gap: 10px;
`

const listSectionTopBtns = css`
  display: flex;
  flex-direction: row;
  align-item:center;
  gap: 5px;
  
`

const listSectionInputsList = css` 
  display: flex; 
  flex-direction: column;
  gap: 10px; 
`

const listSectionInputs = css`
  display: flex;
  flex-direction: column;
  gap: 10px;

`

const listSectionInputsRow = css`
  display: flex;
  flex-direction: column;
  gap: 5px;

`





const ListSection = (props) => {
  const {listState, handleSectionsButtons,handleRemoveRowList,handleChangeListInputs} = props
  return (
    <div css={listSectionMainContainer}>
      
      {listState?.listSection?.map((ele, i)=>(
        <div css={listSectionInputsList} key={i}>
          <div css={listSectionInputs}>
            <div css={listSectionTopBtns}>
              {sectionData
                .filter((btns) => btns.add || listState.listSection.length > 1) // Hide "Remove Section" when only 1 section
                .map((btns) => (
                  <CustomButton
                    key={btns.id}
                    title={btns.add ? btns.title : `${btns.title} ${i + 1}`}
                    bgColor={btns?.add ? "#00bfff" : "#EA322E"}
                    textColor="#fff"
                    clickHandler={() => handleSectionsButtons(btns, i)}
                  />
              ))}
            </div>
            
            <span>Section {i+1}</span>
            
            <div>
              <CustomInput 
                placeholder="Section Title"
                onChange={(e) => handleChange(i, null, "title", e.target.value)}
              />
            </div>
            {ele.row?.map((rowEle, index)=>(

              <div css={listSectionInputsRow} key={index}>
                <div>
                  <CustomInput 
                    placeholder="Row Title"
                    onChange={(e) => handleChange(i, index, "rowTitle", e.target.value)}
                  />
                </div>
                <div>
                  <CustomInput 
                    placeholder="Row Description"
                    onChange={(e) => handleChange(i, index, "rowDescription", e.target.value)}
                  />
                </div>
                {ele.row?.length > 1 && 
                  <div>
                    <CustomButton 
                      title={`Remove Row ${index + 1}`}
                      bgColor='#EA322E'
                      textColor= "#fff"
                      clickHandler ={()=>handleRemoveRowList(i,index)}
                    />
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
      ))}
      
    </div>
  )
}

export default ListSection