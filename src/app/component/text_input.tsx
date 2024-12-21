import React, { useState } from "react";
import { types } from "util";
// import { RiContactsBook3Line } from "react-icons/ri";
import { FaUser } from "react-icons/fa";

// type Props = {};

const textInput = () => {
  return (
    <div className="flex items-center border border-gray-300 rounded-md p-2 shadow-sm w-full max-w-sm">
      {/* Icon */}
      <FaUser className="text-gray-400 mr-2" />

      {/* Input */}
      <input
        type="text"
        placeholder="กรอกชื่อผู้เล่น"
        className="w-full focus:outline-none placeholder-gray-400"
      />
    </div>
  );
};

export default textInput;
