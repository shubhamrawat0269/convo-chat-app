import styles from "./SearchUserWrapper.module.css";
import { useSelector } from "react-redux";
import { IoSearchOutline } from "react-icons/io5";
import CircularLoader from "../circularLoader/CircularLoader";
import UserCard from "../userCard/UserCard";

const SearchUserWrapper = () => {
  const { searchUserData } = useSelector((state) => state.userData);

  return (
    <div className={styles.searchUserWrapper}>
      <div className={styles.searchUserContent}>
        <div className={styles.inputBox}>
          <input
            type="text"
            className={styles.searchInput}
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
            searchUserData?.data.map((user, index) => {
              return <UserCard key={user?._id} user={user} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchUserWrapper;
