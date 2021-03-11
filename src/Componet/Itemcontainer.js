import React from 'react'
import { connect } from 'react-redux'
import { buycakes} from '../Redux/Cakeaction'
import {ice} from '../Redux/Iceaction'

function Itemcontainer(props) {
    return (
        <>
          <h2>item - {props.item}</h2>
          <button onClick={props.dis}>buy a item </button>

        </>
    )
}

const mapStateToprops=(state, ownpops)=>{

    const itemstate =ownpops.cake
    ?state.cake.numofcake
    :state.icecream.numofice
    return {

        item : itemstate
    }
}
 const mapDispatchToprops=(dispatch,ownpops)=>
 {
     const dispatchfunction = ownpops.cake
     ?()=>dispatch(buycakes())
     :()=>dispatch(ice())
 

 return {
     dis : dispatchfunction
 }
}
export default  connect(mapStateToprops,mapDispatchToprops) (Itemcontainer)
