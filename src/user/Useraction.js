import axios from 'axios'
import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "./Usertype"



export  const fetchuserrequest =()=>
{  return{


    type: FETCH_USER_REQUEST
}
}

export const  fetchsucees=user=>
{
    return{
        type:FETCH_USER_SUCCESS,
        payload:user
    }
}

export const  fetchfailure=error=>
{
    return{
        type:FETCH_USER_FAILURE,
        payload:error
    }
}
export const fetchuser=()=>
{ 
    return(dispatch)=>
    {
        dispatch(fetchuserrequest)
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(responce=>{
            const user= responce.data
            dispatch(fetchsucees(user))
        })
        
            .catch(error=>{
                const errorme = error.message
                dispatch(fetchfailure(errorme))
            })
        
    }
}