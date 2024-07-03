import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  logout,
  setOnlineUser,
  signInStart,
  signInSuccess,
} from "../../store/slices/userSlice";
import { Sidebar } from "../../components";
import styles from "./Home.module.css";
import io from "socket.io-client";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

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
      } else if (res.data.data.logout) {
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

  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_BACKEND_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
    });

    socketConnection.on("onlineuser", (data) => {
      // console.log(data);
      dispatch(setOnlineUser(data));
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  return (
    <div className={styles.homeWrapper}>
      <section
        className={`bg-white ${location.pathname !== "/" && "hidden"} lg:block`}
      >
        <Sidebar />
      </section>
      {/* Message Section  */}
      <section className={`${location.pathname === "/" && "hidden"}`}>
        <Outlet />
      </section>

      <div
        className={`${
          location.pathname != "/" ? "hidden" : "lg:flex"
        } justify-center items-center flex-col gap-5 `}
      >
        <h1 className={styles.heading}>Convo Chat App</h1>
        <p className={styles.para}>Select user to send message</p>
      </div>
    </div>
  );
};

export default Home;
