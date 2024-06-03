import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const CheckEmailPage = () => {
  const [userSignupData, setUserSignupData] = useState({
    email: "",
  });

  const navigate = useNavigate();

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
    const url = `${import.meta.env.VITE_BACKEND_URL}/user/email`;
    try {
      const res = await axios.post(url, userSignupData);
      // console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/password", {
          state: res?.data?.data,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setUserSignupData({
        email: "",
      });
    }
  };

  return (
    <div className="bg-yellow-800  flex justify-center items-center h-screen">
      <div className="bg-white px-3 lg:px-7 py-10 shadow-lg">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-4xl font-bold text-black">
            Login Form
          </h2>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={userSignupData.email}
              onChange={handleUserSignUp}
              className="bg-gray-50 border border-gray-400 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-orange-800 hover:bg-orange-600 w-full text-white text-center py-2 font-bold rounded-md"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="p-2 text-center">
          New User ?{" "}
          <span className="text-orange-400">
            <Link to="/register">Register</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default CheckEmailPage;
