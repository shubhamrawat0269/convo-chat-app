import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

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

  const fetchUserDetails = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/user/user-details`;

    const token = JSON.parse(localStorage.getItem("token"));

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const res = await axios.get(url, config);
      console.log("User Details: ", res);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="">
      <button className="p-2 bg-orange-900 text-white" onClick={handleLogout}>
        Logout
      </button>
      {/* Message component  */}
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Home;
