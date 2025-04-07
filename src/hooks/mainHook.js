import useStandardMessagesServices from "../library/WhatsappForm/Services/standardMessagesServices"
import useFormServices from "../library/WhatsappForm/Services/whatappFormService"
import useIntMessages from "./IntMessageHook"

const useMainServices = () =>{
    
    const {whatsappInitialFormValue} = useFormServices()

    const {intMsgState} = useIntMessages()

    const {state} = useStandardMessagesServices()


    const sendWhatsForm = (messageType)=>{


        console.log(state)

        console.log('intMsgState',intMsgState)
        console.log('messageType', messageType)
    }


    return {
        sendWhatsForm
    }



}


export default useMainServices