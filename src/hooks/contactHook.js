import { useReducer } from "react"

const conatctInitialList = {
    address:[
        {
            street: '',
            city: '',
            state: '',
            zip: '',
            country: '',
            country_code: '',
            type: ''
        }
    ],
    addressDate:'',
    emails:[
        {email:'', type:''},
    ],
    emailContactName:'', emailCompanyName:'', emailDepartmentName:'', emailDepartmentTitle:'',
    phone:[
        {number:'', type:''},
    ],
    whatsappNumber:'',
    webURL:[
       { url:'', type:''}
    ]
}


const contactReducer = (state, action)=>{
    
    switch(action.type){
        case "ADD_ADDRESS":
            return {
                ...state,
                address: [
                    ...state.address,
                        {street: '',city: '', state: '',zip: '',country: '', country_code: '',type: ''}
                ]
            };
        case "REMOVE_ADDRESS":
            return {
            ...state,
                address: state.address.filter((__, index) => index !== action.payload)
            };
        case "ADD_EMAIL":
            return{
                ...state,
                    emails:[
                        ...state.emails,
                            {email:'', type:''}
                    ]
            };
        case "REMOVE_EMAIL":
            return {
                ...state,
                    emails: state.emails.filter((__, index) => index !== action.payload)
            };
        case "ADD_PHONE":
            return {
                ...state, 
                phone:[
                    ...state.phone,
                        {number:'', type:''}
                ]
            };
        
        case "REMOVE_PHONE":
            return{
                ...state, 
                    phone: state.phone.filter((__, index)=> index !== action.payload)
            }
        case "ADD_URL":
            return {
                ...state, 
                webURL:[
                    ...state.phone,
                       { url:'', type:''}
                ]
            };
        
        case "REMOVE_URL":
            return{
                ...state, 
                    webURL: state.webURL.filter((__, index)=> index !== action.payload)
            }
        default:
            return state;
    }
}


const useContactServices = ()=>{

    const [contactList, contactDispatch] = useReducer(contactReducer, conatctInitialList)

    const addAddress = ()=>{
        contactDispatch({type: 'ADD_ADDRESS'})
    }

    const removeAddress =(index)=>{
        contactDispatch({type: "REMOVE_ADDRESS", payload: index})
    }

    const addEmail =()=>{
        contactDispatch({type: 'ADD_EMAIL'})
    }

    const removeEmail=(index)=>{
        contactDispatch({type: "REMOVE_EMAIL", payload: index})
    }
    
    
    const addPhone=()=>{
        contactDispatch({type: 'ADD_PHONE'})
    }
    
    const removePhone=(index)=>{
        contactDispatch({type: "REMOVE_PHONE", payload: index})
    }
    const addURL=()=>{
        contactDispatch({type: 'ADD_URL'})
    }
    
    const removeURL=(index)=>{
        contactDispatch({type: "REMOVE_URL", payload: index})
    }

    return {
        contactList,
        addAddress,
        removeAddress,
        addEmail,
        removeEmail,
        addPhone,
        removePhone,
        addURL,removeURL
    }

}


export default useContactServices