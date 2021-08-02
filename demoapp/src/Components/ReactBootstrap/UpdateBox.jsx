import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import CreateIcon from "@material-ui/icons/Create";

function UpdateBox(props) {
  const [open, setOpen] = useState(false);
  const [edit, setedit] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getdata = () => {
    handleClickOpen();
    console.log(props.list);
    var updateitem = props.list.filter((index) => index.id === props.id);
    console.log(updateitem[0].comment);

    setedit(updateitem[0].comment);
  };
  const editdata = (event) => {
    setedit(event.target.value);
  };

  const updatedata = () => {
    var updateitem = props.list.filter((index) => index.id === props.id);

    const newdata = (updateitem[0].comment = edit);
    console.log("newdata", newdata);
    console.log(props.list);
    props.setlist([...props.list]);

    setedit("");
    handleClose();
  };

  return (
    <div>
      <CreateIcon onClick={() => getdata()} />

      <Dialog open={open} onClose={handleClose}>
        <input
          type="text"
          name="newcomments"
          className="updatefield"
          placeholder="Enter Comment"
          value={edit}
          onChange={editdata}
        ></input>

        <DialogActions>
          <button type="submit" onClick={updatedata} className="agreelogin">
            Update
          </button>
          <button type="submit" onClick={handleClose} className="agreelogin">
            cancel
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateBox;
