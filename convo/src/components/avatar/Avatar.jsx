import React from "react";

const Avatar = ({ name, width }) => {
  return (
    <div style={{ width }} className="">
      {name?.slice(0, 2).toUpperCase()}
    </div>
  );
};

export default Avatar;
