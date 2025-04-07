import { useReducer } from "react";


const initialState = {

    listSection:[
        {title: '', row:[{rowTitle:'', rowDescription:''}]},
    ]

}

const listReducer = (state, action)=>{
    switch(action.type){
        case "ADD_SECTION":
            return {
                ...state,
                listSection: [
                    ...state.listSection,
                    {title: '', row:[{rowTitle:'', rowDescription:''}]}
                ]
            };
        case "DELETE_SECTION":
            return {
                ...state,
                listSection: state.listSection.filter(
                    (_, index) => index !== action.payload
                )
            };

        case "ADD_ROW":
            return {
                ...state,
                listSection: state.listSection.map((section, index) =>
                    index === action.payload
                        ? {
                              ...section,
                              row: [
                                ...section.row,
                                {rowTitle:'', rowDescription:''}
                              ]
                          }
                        : section
                )
            };
        case "DELETE_ROW":
            return {
                ...state,
                listSection: state.listSection.map((section, sectionIndex) =>
                    sectionIndex === action.payload.sectionIndex
                        ? {
                              ...section,
                              row: section.row.filter(
                                  (_, rowIndex) => rowIndex !== action.payload.rowIndex
                              )
                          }
                        : section
                )
            };

        case "HANDLE_CHANGE":
            return {
                ...state,
                listSection: state.listSection.map((section, sectionIndex) =>
                sectionIndex === action.payload.sectionIndex
                    ? {
                        ...section,
                        [action.payload.field]: action.payload.value, // For section title
                        row: section.row.map((row, rowIndex) =>
                        rowIndex === action.payload.rowIndex
                            ? { ...row, [action.payload.field]: action.payload.value } // For rowTitle & rowDescription
                            : row
                        ),
                    }
                    : section
                ),
            };
        default:
            return state;
    }
}


const useListServices = ()=>{


    const [listState, dispatch] = useReducer(listReducer, initialState)


    const handleSectionsButtons =(data, index)=>{

        const typeId = data.id 

        switch(typeId){
            case 1:
                dispatch({type:"ADD_SECTION"})
                break;
            
            case 2: 
                dispatch({type: "ADD_ROW", payload: index})
                break;
            case 3: 
                dispatch({type: "DELETE_SECTION", payload: index})
                break;

            

            default:
             break;
        }
    }

    const handleRemoveRowList = (sectionIndex, rowIndex)=>{
        dispatch({type: "DELETE_ROW", payload:{sectionIndex: sectionIndex,rowIndex: rowIndex } })
    }


    const handleChangeListInputs = (sectionIndex, rowIndex, field, value) => {
        dispatch({
            type: "HANDLE_CHANGE",
            payload: { sectionIndex, rowIndex, field, value },
        });
    };



    return {
        listState,
        handleSectionsButtons,
        handleRemoveRowList,
        handleChangeListInputs

    }



}


export default useListServices