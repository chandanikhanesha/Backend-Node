import React, { useState } from 'react';
import FormatStrikethroughSharpIcon from '@material-ui/icons/FormatStrikethroughSharp';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import CancelIcon from '@material-ui/icons/Cancel';
import EditIcon from '@material-ui/icons/Edit';
import Delete from './Delete';

const Strike = (pops) => {
    const [line, setline] = useState(false);

    const cancel = () => {
        if (line == false) {
            setline(true);
        }
        else {
            setline(false);
        }

    }

    const update = () => {

        pops.onupdate(pops.id, pops.text);


    }
    // const add=()=>
    // {
    //     setline(false);
    // }

    return (
        <>

            <li style={{ textDecoration: line ? "line-through" : "none" }}>  <Button onClick={cancel} >

                <FormatStrikethroughSharpIcon variant="contained" color="default"></FormatStrikethroughSharpIcon></Button>    {pops.text}

                <Tooltip title="remove">
                    <Button>
                        <CancelIcon variant="contained" color="secondary"

                            onClick={() => {
                                pops.onSelect(pops.id);
                            }}
                        />
                    </Button>
                </Tooltip>
                <Tooltip title="Update">
                    <Button onClick={update} ><EditIcon variant="contained" color="primary"></EditIcon></Button>
                </Tooltip>
            </li>
        </>
    );

};

export default Strike;