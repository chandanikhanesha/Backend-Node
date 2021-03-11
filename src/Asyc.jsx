const initialstate={

    users :[],
    loading:false,
    error:'',

}

const FETCH_USER_REQUEST ='FETCH_USER_REQUEST'
const FETCH_USER_SUCCESS='FETCH_USER_SUCCESS'
const FETCH_USER_FAILUER = 'FETCH_USER_FAILURE'

const fetchuserrequest=()=>
{
    return{
        type:FETCH_USER_REQUEST,
    }
}

const fetchusersuccess=users=>
{
    return{
        type:FETCH_USER_SUCCESS,
        payLoad :users,
    }
}

const fetchuserfailure=error=>
{
    return{
        type:FETCH_USER_FAILUER,
        payload:error
    }
}

const reducer=(state=(initialstate,action)=>
{
    switch(action.type){
        case FETCH_USER_REQUEST:
            return{
                ...state,
                loaging:true

            
        }
        case FETCH_USER_SUCCESS:
            return{
           
                loading:false,
                user:action.payLoad,
                error:''

            }
            case FETCH_USER_FAILUER:
                return{
                    loading:false,
                    user:[],
                    error:action.payLoad
                }
    }
})