import React,{useState} from 'react';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import TextField from '@material-ui/core/TextField';

const Note=(pops)=>

{ const [edit,setedit]=useState(false);
    const[title,settitle]=useState(pops.title);
    const [content,setcontent]=useState(pops.content);
    
    const ondel=()=>
    {
        pops.delnote(pops.id);
    }
    const newtt=(event)=>
    {
        settitle(event.target.value);
    }
    const newct=(event)=>
    {
        setcontent(event.target.value);
    }
    const save=()=>
    {
       setedit(false);
    }
    return(
        <>

<div className="a_note">
{edit==false? <><div className="input">
        <div className="text-capitalize text-dark">
        <h2>{title}</h2><br></br>
        </div></div>
        <div  className="textarea">
        <p>{content}</p></div></>:<> <TextField id="standard-basic" label="title" value={title} onChange={newtt}/>
            <textarea value={content} onChange={newct}/>
            <Button  onClick={save} style={{float:"right",top:"-40px"}} >
            <CheckBoxIcon />
            </Button>
            
            
        </>}
       

             {/* <div className="input">
            <input type="text" placeholder="Title" autoComplete="off"/><br></br><br></br>
            </div>
            <div  className="textarea">
            <textarea  rows="3" column="2" placeholder="write a note"/>
            </div>  */}
         
            <Button  onClick={ondel} style={{float:"right",top:"-1px"}} >
            <DeleteOutlineIcon />
            </Button>
            
            <Button style={{float:"right",top:"-1px"}}>
            <EditIcon onClick={()=>
            {setedit(true);

            }} />
            </Button>
        </div>
        </>
    );
}

export default Note;