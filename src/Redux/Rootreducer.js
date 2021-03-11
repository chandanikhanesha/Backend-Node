import { combineReducers} from 'redux'
import Cakereducer from './Cakereducer'
import Icereducer from './Icereducer'
import Userreducer from '../user/Userreducer'


const rootreducer= combineReducers({
    cake : Cakereducer,
    icecream : Icereducer,
    user:Userreducer
})
 export default rootreducer;