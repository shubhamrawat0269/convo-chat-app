import React from "react";
import { useSelector } from "react-redux";
const Avatar = ({ userId, name, width, height, imgUrl }) => {
  const { onlineUser } = useSelector((state) => state.userData);

  const isOnline = onlineUser.includes(userId);
  // console.log(userId);
  return (
    <div className="relative">
      {imgUrl ? (
        <img
          style={{ width, height }}
          src={imgUrl}
          className="rounded-full"
          alt={imgUrl}
        />
      ) : (
        <div
          style={{ width, height }}
          className="bg-slate-900 p-3 rounded-full grid place-content-center text-white"
        >
          {name?.slice(0, 2).toUpperCase()}
        </div>
      )}

      {isOnline && (
        <div className="bg-green-500 p-2 absolute -right-2 bottom-0 rounded-full"></div>
      )}
    </div>
  );
};

export default Avatar;
