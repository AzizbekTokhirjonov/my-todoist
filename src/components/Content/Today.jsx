import React, { useState } from "react";
import { FaRegCommentAlt } from "react-icons/fa";

import { BsThreeDots, BsSliders, BsFillPlusCircleFill } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
const Today = () => {
  const [hover, setHover] = useState(false);
  const [section, setSection] = useState("");
  return (
    <div id="inbox" className="mx-auto">
      <div className="d-flex justify-content-between">
        <div className="title">
          <h4>Today</h4>
        </div>
        <div className="items">
          <ul className="d-flex">
            <li>
              <BsSliders />
              <span> Views</span>
            </li>
          </ul>
        </div>
      </div>
      <div
        className="add-task mt-4"
        onMouseOut={() => setHover(false)}
        onMouseOver={() => setHover(true)}
      >
        {hover ? (
          <BsFillPlusCircleFill className="my-auto" size={20} />
        ) : (
          <AiOutlinePlus className="my-auto" size={20} />
        )}
        <span> Add task</span>
      </div>
    </div>
  );
};

export default Today;
