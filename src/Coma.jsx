import { SettingsInputHdmi } from '@material-ui/icons';
import React, { useContext, useEffect, useState } from 'react';
import {Firstname} from './App2';
import Comb from './Comb';

const Coma=()=>
{  const fname =useContext(Firstname);

    const [num,setnum]=useState(0);
    const [numd,setnumd]=useState(0);

    useEffect(()=>
    {
        alert("i am clicked");
       //document.title=`you click me ${num}`;
    },[num])

    const inc=()=>
    {
        setnum(num+1);
    }
    const dec=()=>
    {
        setnumd(numd+1);
    }

        return(
            <>
          
        <h1>hyyy {fname}</h1>
        <Comb/>  
        <button onClick={inc}>clickme{num}</button>
        <button onClick={dec}>click me{numd}</button>
        </>  
    );
}
export default Coma;
