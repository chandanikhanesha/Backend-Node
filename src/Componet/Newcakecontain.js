import React, { useState }  from 'react'
import {buycakes} from '../Redux/Cakeaction';
import {connect} from 'react-redux'


function Newcakecontain(props) {
    const[number, setnumber] = useState(1)
        return (
        <>
        <h2>num of cake{props.numofcake}</h2>
        <input type='text' value={number} onChange={e=>setnumber(e.target.value)}/>
        <button onClick={()=>props.buycakes(number)}>buy {number} cake</button>
        </>
    )
}
const mapStateToprops=state=>{
    return {
        numofcake : state.cake.numofcake
    }
}
const mapDispatchToprops=dispatch=>{
    return{
        buycakes: number=>dispatch(buycakes(number))
    }
}

export default connect (mapStateToprops,mapDispatchToprops)(Newcakecontain)