import React from 'react';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
const Delete=(pops)=>
{
    
    
         return(
        <>       {pops.text}     
                
                <Button>
                <CancelIcon
                    
                 onClick={()=>
                 {
                 pops.onSelect(pops.id);
                 }}
                />
                </Button>
         
               
         </>
         );
    
    
}

export default Delete;