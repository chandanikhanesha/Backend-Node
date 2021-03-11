import {ICE} from './Icetype'

const initialstate={
    numofice:20
}

const Icereducer=(state=initialstate,action)=>
{
    switch(action.type){
        case ICE:return{
            ...state,
            numofice: state.numofice -1
        }
        default : return state
    }
}
export default Icereducer;