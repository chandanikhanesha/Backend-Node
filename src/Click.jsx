import React,{useState} from 'react';




const Click =() =>

{   let newtime=new Date().toLocaleTimeString();
   // const state =useState();
   const[stime,Settime]=useState(newtime);
   
 const Ctime=()=>

{   let newtime=new Date().toLocaleTimeString();
    Settime(newtime);
}
setInterval(Ctime,1000);


 //react hook
    //const state =useState();

    const [count,setcount]=useState(0);
    const Innum =()=>
    {   
                setcount(count+1);
    }
    
    
    
    return(
    <>
    <div style={{textAlign:'center', padding:'180px'}}> 
    <h1>DIGITAL CLOCK</h1>
    <h2>{stime}</h2>
    
    {/* <button onClick={Ctime}>show time</button>  */}
    <h1>ADD NUMBER</h1>
    <h2>{count}</h2>
    <button onClick={Innum}>Click me</button>
    </div>
    </>

);

}

export default Click;
