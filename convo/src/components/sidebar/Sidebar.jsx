import styles from "./Sidebar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { FaImage, FaUserPlus, FaVideo } from "react-icons/fa";
import { FiArrowUpLeft } from "react-icons/fi";

import { BiLogOut } from "react-icons/bi";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import {
  Avatar,
  Divider,
  EditUserModal,
  SearchUserWrapper,
} from "../../components";
import {
  handleEditUserModal,
  setAllUser,
  setOpenSearchUser,
} from "../../store/slices/userSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    currentUser,
    editUserOpen,
    allUser,
    openSearchUser,
    socketConnection,
  } = useSelector((state) => state.userData);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("sidebar", currentUser?._id);

      socketConnection.on("conversation", (data) => {
        // console.log(data);
        const conversationUserData = data.map((conversationUser, index) => {
          if (
            conversationUser?.sender?._id === conversationUser?.reciever?._id
          ) {
            return {
              ...conversationUser,
              userDetails: conversationUser?.sender,
            };
          } else if (conversationUser?.reciever?._id !== currentUser?._id) {
            return {
              ...conversationUser,
              userDetails: conversationUser?.reciever,
            };
          } else {
            return {
              ...conversationUser,
              userDetails: conversationUser?.sender,
            };
          }
        });
        dispatch(setAllUser(conversationUserData));
      });
    }
  }, [socketConnection, currentUser]);

  const handleLogout = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/user/logout`;

    try {
      const res = await axios.get(url);
      // console.log(res);

      if (res.data.success) {
        localStorage.clear();
        toast.success(res.data.message);
        navigate("/email");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className={styles.sidebarSection}>
      <div className={styles.sidebarWrapper}>
        <div>
          <NavLink
            className={(isActive) =>
              `${styles.sidebarIcons} ${isActive && "bg-slate-300"}`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={20} />
          </NavLink>
          <div
            onClick={() => dispatch(setOpenSearchUser(true))}
            title="add friend"
            className={styles.sidebarIcons}
          >
            <FaUserPlus size={20} />
          </div>
        </div>
        <div className="mb-5">
          <div className={styles.sidebarBottomIcons}>
            <div onClick={() => dispatch(handleEditUserModal())}>
              <button title={currentUser?.name}>
                <Avatar
                  width={35}
                  height={35}
                  userId={currentUser?._id}
                  name={currentUser?.name}
                  imgUrl={currentUser?.profile}
                />
              </button>
            </div>
            <div onClick={handleLogout}>
              <button title="logout">
                <BiLogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.sidebarMessageWrapper}>
        <div>
          <h2 className={styles.sidebarMsgContainer}>Message</h2>
        </div>
        <Divider />
        <div className={styles.sidebarMsgInfoContainer}>
          {allUser.length === 0 && (
            <div className="mt-5">
              <div className={styles.arrowIcon}>
                <FiArrowUpLeft size={40} />
              </div>
              <p className={styles.dummyText}>
                Explore users to start a conversation
              </p>
            </div>
          )}
          {allUser?.map((conv) => {
            return (
              <Link
                to={"/" + conv?.userDetails?._id}
                key={conv?._id}
                className="flex items-center gap-2 px-2 py-3 border-t border-slate-200 hover:bg-teal-500 transition-all cursor-pointer"
              >
                <Avatar
                  imageUrl={conv?.userDetails?.profile}
                  name={conv?.userDetails?.name}
                  width={40}
                  height={40}
                />
                <div className="">
                  <h3 className="">{conv?.userDetails?.name}</h3>
                  <div className="text-slate-500 text-xs flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      {conv?.lastMsg?.imageUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaImage size={15} />
                          </span>
                          <span>Image</span>
                        </div>
                      )}
                      {conv?.lastMsg?.videoUrl && (
                        <div className="flex items-center gap-1">
                          <span>
                            <FaVideo size={15} />
                          </span>
                          <span>Video</span>
                        </div>
                      )}
                    </div>
                    <p className="">{conv?.lastMsg?.text}</p>
                  </div>
                  <p className="text-sm">{conv?.unseenMsg}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {editUserOpen && (
        <EditUserModal
          onClose={() => dispatch(handleEditUserModal())}
          data={currentUser}
        />
      )}

      {openSearchUser && (
        <SearchUserWrapper onClose={() => dispatch(setOpenSearchUser(false))} />
      )}
    </div>
  );
};

export default Sidebar;
