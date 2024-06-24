import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const CheckPasswordPage = () => {
  const [userSignupData, setUserSignupData] = useState({
    password: "",
  });

  const navigate = useNavigate();
  const { state } = useLocation();
  // console.log(state);
  const handleUserSignUp = (e) => {
    const { name, value } = e.target;

    setUserSignupData({
      ...userSignupData,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // console.log(userSignupData);
    // Api Call
    const url = `${import.meta.env.VITE_BACKEND_URL}/user/password`;
    const payload = {
      userId: state[0]?._id,
      password: userSignupData.password,
    };
    try {
      const res = await axios.post(url, payload);
      // console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setUserSignupData({
        password: "",
      });
    }
  };

  useEffect(() => {
    if (!state?.[0]?.name) navigate("/email");
  }, []);

  return (
    <div className="bg-yellow-800  flex justify-center items-center h-screen">
      <div className="bg-white px-3 lg:px-7 py-10 shadow-lg">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-4xl font-bold text-black">
            Welcome <div>{state?.[0]?.name}</div>
          </h2>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={userSignupData.password}
              onChange={handleUserSignUp}
              className="bg-gray-50 border border-gray-400 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-orange-800 hover:bg-orange-600 w-full text-white text-center py-2 font-bold rounded-md"
            >
              Let's Go
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckPasswordPage;
