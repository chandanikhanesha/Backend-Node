import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Cnote from './Cnote';
import Note from './Note';

const Gnote=()=>
{
    const[additem,setitem]=useState([]);
    const addnote=(anote)=>
    {
     setitem((preval)=>
     {
         return[...preval,anote];
     })
     
    }
    const delitem=(id)=>
    {
        setitem((olditem)=>
        {
            return olditem.filter((arr,index)=>
            {
                return index!==id;
            })
        })
    }

    
    return(
        <>
        <Header/>
        <Footer/>
        <Cnote passnote={addnote}/>
       {
            additem.map((value,index)=>
            {
                return <Note
                    key={index}
                    id={index}
                    title={value.title}
                    content={value.content}
                    delnote={delitem}/>

            
        
            
            })
        }
    
    
        </>
    );
}

export default Gnote;