import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";

import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, EditUserModal } from "../../components";
import { handleEditUserModal } from "../../store/slices/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { currentUser, editUserOpen } = useSelector((state) => state.userData);
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
            <div
              className="bg-slate-900 p-2 text-white rounded-full"
              onClick={() => dispatch(handleEditUserModal())}
            >
              <button title={currentUser?.name}>
                <Avatar width={20} height={10} name={currentUser?.name} />
              </button>
            </div>
            <div>
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
