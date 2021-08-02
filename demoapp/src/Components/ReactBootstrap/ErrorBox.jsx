import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useHistory } from "react-router-dom";
import EmojiPopup from "./EmojiPopup";
import UpdateBox from "./UpdateBox";
import TimeAgo from "timeago-react";
import axios from "axios";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import MoodIcon from "@material-ui/icons/Mood";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

export default function ErrorBox(props) {
  const [open, setOpen] = useState(false);

  const [list, setlist] = useState([]);
  const [postedby, setpostedby] = useState();
  const [newcomments, setcomments] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  let history = useHistory();

  const handleClickOpen = () => {
    const token = localStorage.getItem("token");
    if (!token) setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleclickemoji = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseemoji = () => {
    setAnchorEl(null);
  };
  const getpage = () => {
    history.push("/login");
  };
  const getdata = (event) => {
    if (event.keyCode === 13) {
      handleClickOpen();
    }
  };
  const onchnagedata = (event) => {
    setcomments(event.target.value);
  };
  const handleSubmit = (event) => {
    const newdata = {
      id: new Date().getTime().toString(),
      comment: newcomments,
      postid: props.postid,
    };
    setlist([...list.concat(newdata)]);
    console.log([...list.concat(newdata)]);
    setcomments("");
    event.preventDefault();
    comments({
      comment: newdata.comment,
      postid: newdata.postid,
      commentid: newdata.id,
    });
    console.log(props.postid);
  };
  const handleRemove = (id) => {
    const deletelist = [...list].filter((index, i) => index.id !== id);
    setlist(deletelist);
  };

  async function comments(data) {
    let res = await axios.post("http://localhost:3002/api/comments", data);
    console.log(res.data);
    setpostedby(res.data.postedby);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mt-2 position-relative">
          {list.map((item) => {
            return (
              <div>
                <span className="comment">{postedby}</span>
                <TimeAgo
                  className="addtime"
                  datetime={new Date().toLocaleString() + ""}
                  locale="zh_en"
                />

                <ol className="addcomment" key={item.id}>
                  {item.comment}
                  <HighlightOffIcon onClick={() => handleRemove(item.id)} />
                  <UpdateBox id={item.id} list={list} setlist={setlist} />
                </ol>
              </div>
            );
          })}

          <input
            type="text"
            name="newcomments"
            value={newcomments || ""}
            id={props.postid}
            className="feed__comment-input-bar"
            placeholder="Enter Comment"
            onKeyDown={(e) => getdata(e)}
            onChange={onchnagedata}
          ></input>
          <MoodIcon
            className="emoji"
            variant="contained"
            onClick={handleclickemoji}
          />

          <Popover
            open={anchorEl}
            anchorEl={anchorEl}
            onClose={handleCloseemoji}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <Typography>
              <div className="popover-conatiner text-white">
                <Tabs>
                  <div className="tabbtn">
                    <TabList className="custom-tab-list">
                      <Tab className="custom-tab">Pack 1</Tab>
                      <Tab className="custom-tab">Dota 2</Tab>
                      <Tab className="custom-tab">emoji</Tab>
                    </TabList>
                  </div>
                  <TabPanel>
                    <div className="emojibox">
                      {Array.from(Array(14).keys()).map((item) => (
                        <img
                          className="img rounded emoji-img"
                          onClick={() => {
                            handleCloseemoji();
                            setcomments(`pack1/${item + 1}.png`);
                          }}
                          src={
                            require(`../../emoji/pack1/${item + 1}.png`).default
                          }
                        />
                      ))}
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className="emojibox">
                      {Array.from(Array(26).keys()).map((item) => (
                        <img
                          className="emoji-img"
                          onClick={() => {
                            handleCloseemoji();
                            setcomments(`pack2/${item + 1}.png`);
                          }}
                          src={
                            require(`../../emoji/pack2/${item + 1}.png`).default
                          }
                        />
                      ))}
                    </div>
                  </TabPanel>
                  <div className="emojibox">
                    <Picker
                      color="#ae65c5"
                      onClick={(emoji) => {
                        console.log(emoji.native);

                        setcomments([newcomments + emoji.native]);
                      }}
                    />
                  </div>
                  <TabPanel></TabPanel>
                </Tabs>
              </div>
            </Typography>
          </Popover>
        </div>
      </form>
      <Dialog open={open} onClose={handleClose}>
        <span className="alert_text">
          Not LoggedIn , You need to login first!
        </span>
        <DialogActions>
          <button type="submit" onClick={getpage} className="agreelogin">
            Login
          </button>
          <button type="submit" onClick={handleClose} className="agreelogin">
            cancel
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
