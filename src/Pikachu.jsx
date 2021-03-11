import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pikachu=()=>
{  const [num,setnum]=useState();
    const [name,setname]=useState();
    const [move,setmove]=useState();

    useEffect(()=>
    {   async function getdata(){
       const res= await axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`);

       console.log(res);
       setname(res.data.name);
       setmove(res.data.moves.length);
  
    }
    getdata();
    })

    const eve=(event)=>
    {
        setnum(event.target.value);
      
    }
    return(
        <>
        <h1>you choose {num} value</h1>
        <h1>your name is {name}</h1>
        <h1>i have  {move} moves</h1>
        <select value={num} onChange={eve}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="25">25</option>
        </select>
        </>
    );
}

export default Pikachu;