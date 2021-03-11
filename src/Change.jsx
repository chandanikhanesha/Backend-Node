 
import React,{useState} from 'react';

const Change=()=>
{
   // let purple='purple';
    const state=useState();

    const [bgc,setbg]=useState('purple');
    const [bname,setname]=useState('click me');

    const bgchange=()=>{
       // let newbg='black';
        setbg('black');
        setname('oyyye😏');
    }
    const bgback=()=>
    {
        let newbg="red";
        setbg(newbg);
        setname('Ayyyyyyo😠');
        };



    return(
        <>
        <div style={{textAlign:"center", padding:"400px",backgroundColor:bgc}}>
        <button onClick={bgchange} onDoubleClick={bgback}>{bname}</button>
        </div>
        </>
    );
};


export default Change;