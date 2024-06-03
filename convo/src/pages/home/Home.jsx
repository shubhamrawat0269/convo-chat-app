import axios from "axios";
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
        toast.success(res.data.message);
        navigate("/email");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

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
