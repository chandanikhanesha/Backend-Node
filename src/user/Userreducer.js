
import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "./Usertype"

const initialstate ={
    loading:true,
    user:[],
    error:''
}

const reducer=(state=initialstate,action)=>{
    switch(action.type){
        case FETCH_USER_REQUEST:
            return{
                ...state,
                payload:true

            }
    
    case FETCH_USER_SUCCESS:
        return{
            payload:false,
            user:action.payload,
            error:''

        }
        case FETCH_USER_FAILURE:
            return{
                payload:false,
                user:[],
                error:action.payload
                
            }

            default: return state}
}




export default reducer