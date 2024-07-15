import { useRef, useState } from "react";
import styles from "./EditUserModal.module.css";

import { Avatar, Divider } from "../../components";
import uploadFile from "../../utils/helper/uploadFile";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  handleEditUserModal,
  signInSuccess,
} from "../../store/slices/userSlice";

const EditUserModal = ({ onClose, data }) => {
  const uploadPhotoRef = useRef();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userData);
  const [userData, setUserData] = useState({
    name: data?.name,
    profile: data?.profile,
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

  const handleUploadPhotoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadPhotoRef.current.click();
  };

  const handleUploadPhoto = async (e) => {
    const uploadPhoto = await uploadFile(e.target.files[0]);

    setUserData((preData) => {
      return {
        ...preData,
        profile: uploadPhoto?.data?.url,
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/user/update-user`;
      const res = await axios.post(url, userData);
      // console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(signInSuccess(res.data.data));
        dispatch(handleEditUserModal());
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message);
      setUserData({
        name: "",
        profile: "",
      });
    }
  };

  return (
    <div className={styles.userModalWrapper}>
      <div className={styles.modalcontainer}>
        <h2 className="font-semibold">Profile Details</h2>
        <p className="text-sm">Edit user details</p>
        <form className={styles.formSection} onSubmit={onSubmit}>
          <div className={styles.formInputBox}>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              className={styles.formInput}
              value={data?.name}
              onChange={handleOnChange}
            />
          </div>
          <div>
            <div>Photo:</div>
            <div className={styles.uploadPhoto}>
              <Avatar
                userId={currentUser?._id}
                width={35}
                height={35}
                name={data?.name}
                imgUrl={userData?.profile}
              />
              <label htmlFor="profile">
                <button
                  className="font-semibold"
                  onClick={handleUploadPhotoClick}
                >
                  Change Photo
                </button>
                <input
                  type="file"
                  id="profile"
                  ref={uploadPhotoRef}
                  className="hidden"
                  onChange={handleUploadPhoto}
                />
              </label>
            </div>
          </div>
          <Divider />
          <div className={styles.btnSection}>
            <button onClick={onClose} className={styles.cancelBtn}>
              Cancel
            </button>
            <button onClick={onSubmit} className={styles.saveBtn}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
