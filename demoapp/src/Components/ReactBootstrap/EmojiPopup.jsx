import React, { useState } from "react";

import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import MoodIcon from "@material-ui/icons/Mood";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

function EmojiPopup(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleclickemoji = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseemoji = () => {
    setAnchorEl(null);
  };

  return (
    <div>
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
              <TabList className="custom-tab-list">
                <Tab className="custom-tab">Pack 1</Tab>
                <Tab className="custom-tab">Dota 2</Tab>
              </TabList>
              <TabPanel>
                <div className="emoji-conatiner">
                  {Array.from(Array(14).keys()).map((item) => (
                    <img
                      onClick={() => console.log("hyyyy")}
                      className="img rounded emoji-img"
                      src={require(`../../emoji/pack1/${item + 1}.png`).default}
                    />
                  ))}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="emoji-conatiner">
                  {Array.from(Array(26).keys()).map((item) => (
                    <img
                      className="img rounded emoji-img"
                      src={require(`../../emoji/pack2/${item + 1}.png`).default}
                    />
                  ))}
                </div>
              </TabPanel>
            </Tabs>
          </div>
        </Typography>
      </Popover>
    </div>
  );
}

export default EmojiPopup;

// <Popover
// isOpen={isPopoverOpen}
// positions={["top"]}
// padding={10}
// reposition={false}
// onClickOutside={() => setIsPopoverOpen(false)}
// align="end"
// content={
//   <div className="popover-conatiner position-relative text-white">
//     <i
//       onClick={() => setIsPopoverOpen(false)}
//       class="fas fa-times position-absolute close-icon"
//     ></i>
//     <Tabs>
//       <TabPanel>
//         <div className="emoji-conatiner">
//           {Array.from(Array(14).keys()).map((item) => (
//             <img
//               onClick={() => {
//                 setIsPopoverOpen(false);
//                 addComment(_id, `./pack1/${item + 1}.png`);
//               }}
//               className="img rounded emoji-img"
//               src={
//                 require(`../assets/emoji/pack1/${item + 1}.png`)
//                   .default
//               }
//             />
//           ))}
//         </div>
//       </TabPanel>
//       <TabPanel>
//         <div className="emoji-conatiner">
//           {Array.from(Array(26).keys()).map((item) => (
//             <img
//               onClick={() => {
//                 setIsPopoverOpen(false);
//                 addComment(_id, `./pack2/${item + 1}.png`);
//               }}
//               className="img rounded emoji-img"
//               src={
//                 require(`../assets/emoji/pack2/${item + 1}.png`)
//                   .default
//               }
//             />
//           ))}
//         </div>
//       </TabPanel>
//       <TabList className="custom-tab-list">
//         <Tab>Pack 1</Tab>
//         <Tab>Dota 2</Tab>
//       </TabList>
//     </Tabs>
//   </div>
// }></Popover>
