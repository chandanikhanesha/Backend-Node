import React, { useState } from 'react';
import Delete from './Delete';
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';

const Todo=()=>

{

 const [additem,setadditem]=useState("");
 const [item,setitem]=useState([]);

 const add=(event)=>
 {
     setadditem(event.target.value);
 }

 const itemadd=()=>
 {
     setitem((olditem)=>
     {
         return[...olditem,additem];
     });
     setadditem("");
 }

 const delitem=(id)=>
 {
     console.log("deleted");
     setitem((olditem)=>
     { 
         return olditem.filter((arrele,index)=>
         {
             return index!==id;
         });
     });
 };

 //backgroundColor:"grey",padding:"300px"
        return(
            <>
                       <div  className="card" >
                        <h1>todo list</h1>
                        <input style={{fontSize:"20px",backgroundColor:"white"}}  type="text"  onChange={add} placeholder="Add a item" value={additem} />
                        <button ><AddBoxSharpIcon onClick={itemadd}/></button>
                        
                       
                        <ol>
                      
                            {/* <li>{additem}</li> */}
                           {/* { item.map((itemval)=>
                           {
                               return (
                                   <><li>{itemval}</li>
                                   </>
                               );
                           })}  */}

                           
                           
                            {item.map(( itemval,index)=>
                            {   return(
                                <Delete
                                text={itemval}
                                key={index}
                                id={index}
                                
                                onSelect={delitem}
                                />);
                            })} 

                            </ol>
                            
                            </div>
                       
                    


            </>
        );
}

export default Todo;