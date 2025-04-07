import { useState } from "react"
import { gettingTemplates } from "./apiHittingServices"

const useFormServices = ()=>{

    const [whatsappInitialFormValue, setInitialFormValue] = useState({
        // template: 1, 
        messageType:1,
        hash_key:'',
        templates:[],
        freeFormMessageType:1

    })


    const handleChangeRadio = (e)=>{
        const {name, value} = e.target
        setInitialFormValue((prevState)=>({
            ...prevState,
            [name]: value
        }))
    }


    const handleChangeInput = (e)=>{
        const {name, value} = e.target
        if(name === 'hash_key'){
            getTempaltes(value)
            
        }

        setInitialFormValue((prevState)=>({
            ...prevState,
            [name]: value 
        }))

    }


    const getTempaltes = async(hash)=>{
        try {
            
            const templateResponse = await gettingTemplates(hash)
            const responseData = templateResponse.data 
            if(templateResponse.status === 200 && responseData.STATUS === "SUCCESSFUL"){
                const newData = responseData.DB_DATA
                setInitialFormValue((prevState)=>({
                    ...prevState,
                    templates: newData 
                }))
            }
        } catch (error) {
            
        }
    }


    return {
        whatsappInitialFormValue,handleChangeRadio,handleChangeInput
    }
}


export default useFormServices