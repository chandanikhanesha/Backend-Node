import React, { useContext } from 'react';
import {Firstname,lastname} from './App2';


const Comb=()=>
{  
    const fname= useContext(Firstname)
    const lname= useContext(lastname)
   
    return(
        <>
        <h1>yoooo</h1>{fname}{lname}
        </>
    );
}
export  default Comb;