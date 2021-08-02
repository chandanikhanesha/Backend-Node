import React, { useState, useEffect } from "react";
// import Data from "../../data.json";

function TextBox(props) {
  const [obj, setobj] = useState([]);

  useEffect(() => {
    setobj(props.alltags.map((cc) => ({ item: cc, isActive: false })));
  }, [props.alltags]);

  const itemOnClick = (item) => {
    obj.find((itm) => {
      if (itm.item === item.item) {
        itm.isActive = !itm.isActive;
      }
    });
    setobj([...obj]);
  };

  return (
    <div>
      {obj.map((item, index) => (
        <div
          key={index}
          className="d-inline-flex mb-2"
          onClick={() => {
            return props.filteritem(item.item), itemOnClick(item);
          }}
        >
          <span
            className={`ftexttrue ${
              item.isActive ? "ftexttrue" : "ftextfalse"
            }`}
          >
            {item.item}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TextBox;
