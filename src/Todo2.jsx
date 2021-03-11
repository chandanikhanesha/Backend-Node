import React, { useState } from 'react';
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import RemoveCircleSharpIcon from '@material-ui/icons/RemoveCircleSharp';
import Button from '@material-ui/core/Button';
import Strike from './Strike';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";


const Todo2 = () => {
    const [item, setitem] = useState("");
    const [list, setlist] = useState([]);
    const [i, seti] = useState();
    const [ch, setch] = useState(false);

    const add = (event) => {

        setitem(event.target.value);
    }

    const additem = () => {
        setlist((oldval) => {
            return [...oldval, item];
        })
        setitem("");
    }

    const delitem = (id) => {
        setlist((oldval) => {
            return oldval.filter((arr, index) => {
                return index !== id
            })
        })
    }
    const upitem = (id, text) => {
        list.filter((arr, index) => {
            if (id == index) {
                seti(id);
                setitem(text);
            }
            setch(true);
        })
    }
    const chitem = () => {
        list.filter((arr, index) => {
            if (i == index) {
                list[i] = item;
                setlist((val) => {
                    return [...val]
                })
                setitem("");
                setch(false);
            }
        })

    }


    return (

        <>
            <div className="text-capitalize text-center text-danger">
                <h1>todo list</h1>

                <input type="text" placeholder="Add an item" onChange={add} value={item} />
                <Tooltip title="Add">
                    <Button onClick={additem}><AddBoxSharpIcon variant="contained" color="default"></AddBoxSharpIcon></Button>
                </Tooltip>

                {ch ? <Tooltip title="save"><Button className="btn btn-success" onClick={chitem}><CheckIcon variant="contained" color="primary"></CheckIcon></Button>
                </Tooltip>
                    : null}
                <br></br><br></br><br></br>

                {list.map((itemval, index) => {
                    return (<>
                        <Strike
                            text={itemval}
                            key={index}
                            id={index}
                            onSelect={delitem}
                            onupdate={upitem}
                        />

                    </>);
                })
                }
            </div>

        </>

    );


};

export default Todo2;