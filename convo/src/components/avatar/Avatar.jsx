import React from "react";

const Avatar = ({ name, width, height, imgUrl }) => {
  return (
    <div>
      {imgUrl ? (
        <img
          style={{ width, height }}
          src={imgUrl}
          className="rounded-full aspect-square"
          alt={imgUrl}
        />
      ) : (
        <div style={{ width, height }} className="bg-slate-900 p-3 rounded-full grid place-content-center text-white">
          {name?.slice(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default Avatar;
