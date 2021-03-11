import React from 'react';

const Simg=(pops)=>
{   const imgs=`https://source.unsplash.com/400x400/?${pops.name}`;
    return(
        <>
        <img src={imgs} style={{margin:"20px 480px"}}alt="lol"></img>
        </>
    );
}

export default Simg;