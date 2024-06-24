import { useState } from "react";
import styles from "./EditUserModal.module.css";

const EditUserModal = ({ onClose, data }) => {
  const [userData, setUserData] = useState({
    name: data?.name,
    profile_pic: data?.profile_pic,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setUserData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  return (
    <div className={styles.userModalWrapper}>
      <div className={styles.modalcontainer}>
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit user details</p>

        <form action="">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data?.name}
              onChange={handleOnChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
