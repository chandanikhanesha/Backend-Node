import React,{useState} from 'react';

const Form =()=>
{   // const state=useState();

    const [fullname,setfullname]=useState({
    
       fname:"",
       lname:"",
       email:"",
       bod:"",



    });

    // const[name,setname]=useState("");
    // const[fname,setfname]=useState();

    // const[lname,setlname]=useState("");
    // const[lastname,setlastname]=useState();
 const ie=(event)=>
 {
    const{name,value}=event.target;
    setfullname((preval)=>
    {
        return{
            ...preval,
            [name] : value,
        }
  
           
                // if(name==="fname")
                // {
                //     return{

                //         fname:value,
                //         lname:preval.lname,
                //         email:preval.email

                //     };
                // }
                // else if(name==="lname")
                // {
                //     return{
                //         fname:preval.fname,
                //         lname:value,
                //         email:preval.email
                // };
                // }
                // else if(name==="email"){
                //     return{
                //         fname:preval.fname,
                //         lname:preval.lname,
                //         email:value
                //     };
                // }
        
            

            })
        }
    //  const inputevtwo=(event)=>{

    //     setlname(event.target.value);
    //  };

     const submit=(event)=>
     {      
            event.preventDefault();
            alert("your data will be submiited");
            setfullname(()=>
            {
                return{
                    fname:"",
                    lname:"",
                    email:"",
                    bod:""
                }
            });
                 
        
            // setfname(name+" ");
            // setlastname(lname);
            
     }
   
    return(
        <>
         <form onSubmit={submit}>
        <div style={{textAlign:"center",backgroundColor:"grey",padding:"300px"}}>
       
            <h1>Your Data- fname:{fullname.fname} , lname:{fullname.lname} , email:{fullname.email} , bod: {fullname.bod}</h1>
            <label>FirstName : </label> <input style={{ fontSize:"20px"}} 
            type="text"
             placeholder="Enter Your firstname"
             onChange={ie} 
              name="fname" 
              value={fullname.fname}/><br></br><br></br>
           <label>LastName :</label> <input  style={{fontSize:"20px"}} type="text" placeholder="Enter your lastname" onChange={ie} name="lname" value={fullname.lname}/><br></br><br></br>
           <label>EmailId :</label> <input  style={{fontSize:"20px"}} type="text" placeholder="Enter your email" onChange={ie} name="email" value={fullname.email}/><br></br><br></br>
           <label>Birth Of Date :</label> <input  style={{fontSize:"20px"}} type="date" placeholder="Enter your BOD" onChange={ie} name="bod" value={fullname.bod}/><br></br><br></br>
            <button style={{fontSize:"20px"}} type="submit">submit👍</button>
            
            
            </div>
            </form>
        </>
    )
    
    }
export default Form;
