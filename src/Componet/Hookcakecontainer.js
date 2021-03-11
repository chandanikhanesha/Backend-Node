import React from 'react'
import { useSelector,useDispatch} from 'react-redux';
import { buycakes } from '../Redux/Cakeaction';

function Hookcakecontainer() {
const numofcake = useSelector(state => state.cake.numofcake)
const dispatch=useDispatch()
    return (
       <>
       <h2>num of cake {numofcake}</h2>
       <button onClick={()=>dispatch(buycakes())}>buy cake</button>
       </>
    )
}

export default Hookcakecontainer
