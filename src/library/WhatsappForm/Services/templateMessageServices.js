import { useEffect, useState } from "react"
import { generateInputs } from "./generateInputs"

const useTemplateMessageServices = ()=>{


    const [templateMessageValue, setTemplateMessageValue] = useState({
        template:null,
        inputLabels:{},
        body:{},
        header:{}

    })



    const handleChangeTemplate = (selected)=>{
        // console.log('selected', selected)
        const inputs = generateInputs(selected?.value?.template_components)
        setTemplateMessageValue((prevState)=>({
            ...prevState,
            template: selected,
            inputLabels : inputs,
            body:{},
            header:{}
        }))
    
    }


    useEffect(()=>{
        const {template} = templateMessageValue
        if(template !== null){
            // formingTemplateView(template?.value)
        }
    },[templateMessageValue.template])


    const handleInputChangeTemplate = (e,i, inputName)=>{
        const {value} = e.target
        setTemplateMessageValue(prevState => ({
            ...prevState,
            [inputName]: {
                ...prevState[inputName], // Preserve existing fields
                [i]: value  // Update the specific index
            }
        }));
    }


    return {handleChangeTemplate,templateMessageValue,handleInputChangeTemplate}

}


export default useTemplateMessageServices