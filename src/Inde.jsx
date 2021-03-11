import React, { useState } from 'react';
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';



const Inde=()=>{

const[num,setnum]=useState(0);

const inc=()=>
{
    setnum(num+1);

}
const dec=()=>
{
    if(num >0)
    {
        setnum(num-1);

    }
    else
    {
        setnum(0);
        alert("you can't decrease the number");
    }
}

     return(
         <>
        
        <div style={{textAlign:'center',backgroundColor:'grey' }}>
            <h1 >{num}</h1>
            <Tooltip title="Add">
            <Button onClick={inc}><AddBoxSharpIcon /></Button>
            </Tooltip>
            <Tooltip title="delete">
         <Button onClick={dec}><RemoveCircleSharpIcon/></Button>
         </Tooltip>
            </div>
    
         </>
     );
}
export default Inde;