import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  logout,
  signInStart,
  signInSuccess,
} from "../../store/slices/userSlice";
import { Sidebar } from "../../components";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.userData);

  

  const fetchUserDetails = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/user/user-details`;

    const token = JSON.parse(localStorage.getItem("token"));

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      dispatch(signInStart());
      const res = await axios.get(url, config);
      // console.log("User Details: ", res);
      if (res.status === 200) {
        dispatch(signInSuccess(res.data.data));
      } else if (res.data.logout) {
        dispatch(logout());
        navigate("/email");
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className={styles.homeWrapper}>
      {/* <button className="p-2 bg-orange-900 text-white" onClick={handleLogout}>
        Logout
      </button> */}
      <section className="bg-white">
        <Sidebar />
      </section>
      {/* Message component  */}
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
