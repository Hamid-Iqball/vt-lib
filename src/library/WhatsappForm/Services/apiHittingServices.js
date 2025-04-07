import whatsappFormApi from "../model/whatsappForm"

export const gettingTemplates = async(data)=>{
    try {
        const response = await whatsappFormApi.getTemplates(data)
        return response
    } catch (error) {
        console.log(error)
    }
}