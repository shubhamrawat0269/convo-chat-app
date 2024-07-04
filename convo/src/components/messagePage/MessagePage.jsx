import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft } from "react-icons/fa6";

import { useSelector, useDispatch } from "react-redux";
import Avatar from "../avatar/Avatar";
import { setSelectedUserData } from "../../store/slices/userSlice";

const MessagePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { socketConnection, selectedUser } = useSelector(
    (state) => state.userData
  );

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", userId);

      socketConnection.on("message-user", (data) => {
        // console.log("user details", data);
        dispatch(setSelectedUserData(data));
      });
    }
  }, [socketConnection, userId]);

  return (
    <div>
      <header className="sticky top-0 py-2 px-4 bg-white">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center px-5">
            <Link className="lg:hidden" to={`/`}>
              <FaAngleLeft size={18} />
            </Link>
            <div>
              <Avatar
                width={40}
                userId={selectedUser?.id}
                name={selectedUser?.name}
                imgUrl={selectedUser?.profile}
              />
            </div>
            <div>
              <h3 className="text-sm font-bold">{selectedUser?.name}</h3>
              <p
                className={
                  selectedUser?.online
                    ? "text-green-800 text-sm font-semibold"
                    : "text-sm text-slate-400 font-semibold"
                }
              >
                {selectedUser?.online ? "online" : "offline"}
              </p>
            </div>
          </div>
          <div className="cursor-pointer">
            <HiDotsVertical size={22} />
          </div>
        </div>
      </header>

      {/* show all msg  */}
      <section className="h-[calc(100vh-112px)] bg-red-600">
        Show ALl Message
      </section>

      {/* send message  */}
      <section className="">send msg</section>
    </div>
  );
};

export default MessagePage;
