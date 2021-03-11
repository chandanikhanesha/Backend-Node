import React,{useState} from 'react';
import Simg from './Simg';

const Serch =()=>
{
    const [img,setimg]=useState();
     const add=(event)=>
     {
        const data=event.target.value;
        setimg(data);
     }
    return(
        <>
            <input type="text" placeholder="serch item" onChange={add} value={img} style={{margin: "90px 590px",width:"200px"}}/>
           {img==="" ?null: <Simg name={img}/>}
        </>
    );
}

export default Serch;