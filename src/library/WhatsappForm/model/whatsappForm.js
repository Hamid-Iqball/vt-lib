import { whatsappFormInstance } from "./base"

const whatsappFormApi = {

    getTemplates: function(hash){
        return whatsappFormInstance.request({
            method:'GET',
            url:`/whatsapp/get_templates`,
            headers: {
                'Hash_key': hash,
            },
        })
    }

}


export default whatsappFormApi