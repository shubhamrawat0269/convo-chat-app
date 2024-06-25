import styles from "./Sidebar.module.css";
import { NavLink, useNavigate } from "react-router-dom";

import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, EditUserModal } from "../../components";
import { handleEditUserModal } from "../../store/slices/userSlice";
import toast from "react-hot-toast";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, editUserOpen } = useSelector((state) => state.userData);

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
          <div title="add friend" className={styles.sidebarIcons}>
            <FaUserPlus size={20} />
          </div>
        </div>
        <div className="mb-5">
          <div className={styles.sidebarBottomIcons}>
            <div onClick={() => dispatch(handleEditUserModal())}>
              <button title={currentUser?.name}>
                <Avatar
                  width={35}
                  height={40}
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

      {editUserOpen && (
        <EditUserModal
          onClose={() => dispatch(handleEditUserModal())}
          data={currentUser}
        />
      )}
    </div>
  );
};

export default Sidebar;
