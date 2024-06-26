import styles from "./SearchUserWrapper.module.css";
import { useDispatch, useSelector } from "react-redux";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import CircularLoader from "../circularLoader/CircularLoader";
import UserCard from "../userCard/UserCard";
import {
  handleSearchUserInput,
  setSearchUserData,
} from "../../store/slices/userSlice";
import { useEffect } from "react";
import axios from "axios";

const SearchUserWrapper = ({ onClose }) => {
  const dispatch = useDispatch();
  const { searchUserData, searchUserInput } = useSelector(
    (state) => state.userData
  );

  const handleUserSearch = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/user/search-user`;

    try {
      const res = await axios.post(url, { search: searchUserInput });
      // console.log(res);

      if (res.data.success) {
        dispatch(setSearchUserData(res.data.data));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (searchUserInput?.length > 0) handleUserSearch();
  }, [searchUserInput]);

  return (
    <div className={styles.searchUserWrapper}>
      <div className={styles.searchUserContent}>
        <div className={styles.inputBox}>
          <input
            type="text"
            className={styles.searchInput}
            value={searchUserInput}
            onChange={(e) => dispatch(handleSearchUserInput(e.target.value))}
            placeholder="Search user by name or email ....."
          />
          <div className={styles.searchIcon}>
            <IoSearchOutline size={25} />
          </div>
        </div>

        <div className={styles.dropdownMenu}>
          {searchUserData?.data.length === 0 && !searchUserData?.loading && (
            <p className="text-center text-slate-500">no user found</p>
          )}
          {searchUserData?.loading && (
            <p>
              <CircularLoader />
            </p>
          )}

          {searchUserData?.data.length !== 0 &&
            !searchUserData?.loading &&
            searchUserData?.data.map((user) => {
              return <UserCard key={user?._id} user={user} onClose={onClose} />;
            })}
        </div>
      </div>
      <div className={styles.closeBtn} onClick={onClose}>
        <button>
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default SearchUserWrapper;
