import React ,{ useEffect}from 'react'
import {fetchuser} from '../user/Useraction'
import {connect} from 'react-redux'

function Usercontainer({userdata,fetchuser}) {
    useEffect(() => {
        fetchuser()
        
    }, [])
    return userdata.loading?
    (<h2>loading</h2>)
    :userdata.error?
    (<h2>{userdata.error}</h2>)
    :<div>
        <h2>user list</h2>
        <div>{
            userdata &&
            userdata.user &&
            userdata.user.map(user=><p>{user.name}</p>)}
        </div>
    </div>

  
    
}
const mapStateToprops=state=>{
    return{
        userdata: state.user
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        fetchuser:()=>dispatch(fetchuser())
    }
}
export default connect(mapStateToprops,mapDispatchToProps)( Usercontainer)
