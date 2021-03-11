
import React from 'react';



const Sgame =(pops) =>
{
    
    let x=pops.x;
    let y=pops.y;
    let z=pops.z;
if((x==y)&&(y==z)){
 return(
        <>
        
        <div className="head">
            <h1>{x} {y} {z}</h1>
            <h1>this is matching</h1>
            <hr/>
        </div>     

        </>
    );
 }
    else{
        return(
            <>
            <div className="head">
            <h1>{x} {y} {z}</h1>
            <h1>this is not matching</h1>
            <hr/>
        </div>     

            </>

             );
       
}

};

const Smach =()=>
{   return(
    <>
    <div className="head">
    <h1 >welcome to the 🎰 machine game</h1>
    <Sgame x='😄' y='🎅' z='🐈'/>
    <Sgame x='😄' y='😄' z='😄'/>
    <Sgame x='😄' y='🎅' z='🐈'/>
    <Sgame x='🐍' y='🐍' z='🐍'/>
    </div>

    </>
      );
}

export default Smach;


