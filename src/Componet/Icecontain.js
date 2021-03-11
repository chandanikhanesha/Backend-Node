import React from 'react'
import {ice} from '../Redux/Iceaction'
import {connect} from 'react-redux'

function Icecontain(props) {
    return (
        <>
        <h2>num of ice{props.numofice} </h2>
        <button onClick={props.ice}>buy a ice</button>
        </>
    )}
    
    const mapStateToProps=state=>
    {
        return{
           numofice: state.icecream.numofice
        }
    }
    
    const mapDispatchToProps=dispatch=>
    {
        return {
            ice : () => dispatch(ice())
        }
    }
    

export default connect(mapStateToProps,mapDispatchToProps)( Icecontain)
