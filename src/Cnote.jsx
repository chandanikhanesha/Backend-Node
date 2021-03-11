import React, { useState } from 'react';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


const Cnote = (pops) => {
    const [expand, setexpand] = useState(false);
    const [anote, setnote] = useState({
        title: "",
        content: "",


    });



    const add = (event) => {
        const { name, value } = event.target;
        setnote((preval) => {
            return {
                ...preval,
                [name]: value,
            }



        });

    };
    const addevent = () => {
        pops.passnote(anote);
        setnote({
            title: "",
            content: "",


        });

    }
    const expit = () => {
        setexpand(true);
    }
    const stri = () => {
        setexpand(false);
    }

    return (
        <>
            <div className="note">
                <form >
                    {expand ?
                        <div className="input">
                            <input type="text" placeholder="Title" name="title" onChange={add} value={anote.title} autoComplete="off" /><br></br><br></br>
                        </div> : null}
                    <div className="textarea">
                        <textarea rows="" column="" name="content" onDoubleClick={stri} onClick={expit} onChange={add} value={anote.content} placeholder="write a note" />
                    </div>
                    {expand ?
                        <IconButton style={{ float: "right", top: "-20px" }}>
                            <AddCircleSharpIcon onClick={addevent} fontSize="large" />
                        </IconButton> : null}
                </form>
            </div>

        </>
    );
}

export default Cnote;