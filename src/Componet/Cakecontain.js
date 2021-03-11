import React from 'react';
import { buycakes} from '../Redux/Cakeaction';
import { connect } from 'react-redux'

function Cakecontain(props) {
    return (
      <>
      <h2>number of cake {props.numofcake}</h2>
      <button onClick={props.buycakes}>BUY A CAKE</button>
      </>
    )
}

const mapStateToprops=state=>
{
    return{
        numofcake : state.cake.numofcake
    }
}

const mapDispatchToprops=dispatch=>
{
    return {
        buycakes : () => dispatch(buycakes())
    }
}
export default connect (mapStateToprops,mapDispatchToprops)(Cakecontain)
