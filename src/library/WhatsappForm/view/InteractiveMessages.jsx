import React from 'react'
import useInteractiveMessagesServices from '../Services/InteractiveMessagesServices'
import CustomSelect from '../components/customSelect'
import { interactiveMessageData } from '../utils/whatsappFormUtils'
import IntText from './IntText'
import IntMedia from './IntMedia'
import IntRequestLocation from './IntRequestLocation'
import IntSendLocation from './IntSendLocation'
import IntListMessage from './IntListMessage'
import IntSendCatalog from './IntSendCatalog'
import IntContactMessage from './IntContactMessage'

const InteractiveMessages = () => {
  const {state,handleSelectInteractiveMessage} = useInteractiveMessagesServices()
  
  return (
    <div>
        <div>
          <CustomSelect 
              placeHolderTitle="Message Type"
              options={interactiveMessageData?.map((ele) => ({ value: ele.id, label:ele.title}))}
              onChangeHandler={(selectedOption) => handleSelectInteractiveMessage(selectedOption, 'messageType')}
              value={state?.type}
          />
        </div>

        {state?.type?.value === 2 ? 
          <div>
              <IntText 
                
              
              />
          </div>  
          :
          state?.type?.value === 3 ?
            <div>
              <IntMedia />
            </div>
          :

          state?.type?.value === 4 ?
            <div>
              <IntRequestLocation />
            </div>
          :
          state?.type?.value === 5 ?
            <div>
              <IntSendLocation />
            </div>
          :
          state?.type?.value === 6 ?
            <div>
              <IntListMessage />
            </div>
          :
          state?.type?.value === 7 ?
            <div>
              <IntSendCatalog />
            </div>
          :
          state?.type?.value === 8 ?
            <div>
              <IntContactMessage />
            </div>
          :
          
          null
      }
    </div>
  )
}

export default InteractiveMessages