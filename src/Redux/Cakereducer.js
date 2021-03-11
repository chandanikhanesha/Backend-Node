import {BUY_CAKES} from './Caketype'

const initialstate={
    numofcake:10
}

const Cakereducer=(state=initialstate,action)=>{
    switch(action.type){
        case BUY_CAKES:
            return{
                ...state,
                numofcake : state.numofcake - action.payload
            }
            default : return state
    }
    
}

export default Cakereducer