 import {BUY_CAKES} from './Caketype'
 
 export const buycakes=(number=1)=>
{
    return{
        type: BUY_CAKES,
        payload:number
    }
}