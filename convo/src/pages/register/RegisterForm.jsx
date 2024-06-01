import { useState } from "react";
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import uploadFile from "../../utils/helper/uploadFile";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [userSignupData, setUserSignupData] = useState({
    name: "",
    email: "",
    password: "",
    profile: "",
  });

  const [uploadPhoto, setUploadPhoto] = useState("");
  const navigate = useNavigate();

  const handleUserSignUp = (e) => {
    const { name, value } = e.target;

    setUserSignupData({
      ...userSignupData,
      [name]: value,
    });
  };

  const handleUploadPhoto = async (e) => {
    const uploadPhoto = await uploadFile(e.target.files[0]);

    // console.log("Upload Photo", uploadPhoto);
    setUploadPhoto(e.target.files[0]);

    setUserSignupData((preData) => {
      return {
        ...preData,
        profile: uploadPhoto?.url,
      };
    });
  };

  const handleClearPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // console.log(userSignupData);
    // Api Call
    const url = `${import.meta.env.VITE_BACKEND_URL}/user/register`;
    try {
      const res = await axios.post(url, userSignupData);
      console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/email");
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
      setUserSignupData({
        name: "",
        email: "",
        password: "",
        profile: "",
      });
      setUploadPhoto("");
    }
  };

  return (
    <div className="bg-yellow-800  flex justify-center items-center h-screen">
      <div className="bg-white px-3 lg:px-7 py-10 shadow-lg">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-4xl font-bold text-black">
            Registration Form
          </h2>
        </div>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userSignupData.name}
              onChange={handleUserSignUp}
              className="bg-gray-50 border border-gray-400 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
            />
          </div>

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

          <div className="mb-5 relative">
            <input
              type="password"
              name="password"
              value={userSignupData.password}
              onChange={handleUserSignUp}
              placeholder="Password"
              className="bg-gray-50 border border-gray-400 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="profile">
              <div className="bg-gray-50 cursor-pointer border text-center border-gray-400 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400">
                {uploadPhoto?.name ? (
                  <div className="flex justify-center items-center gap-5">
                    <span>{uploadPhoto?.name}</span>
                    <div onClick={handleClearPhoto}>
                      <ImCross size={10} />
                    </div>
                  </div>
                ) : (
                  "Select Photo from device"
                )}
              </div>
            </label>
            <input
              type="file"
              id="profile"
              name="profile"
              placeholder="image url"
              onChange={(e) => handleUploadPhoto(e)}
              className="bg-gray-50 border border-gray-400 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400 hidden"
            />
          </div>

          <div>
            <button
              type="submit"
              className="bg-orange-800 hover:bg-orange-600 w-full text-white text-center py-2 font-bold rounded-md"
            >
              Signup
            </button>
          </div>
        </form>
        <p className="p-2 text-center">
          Already have an account ?{" "}
          <span className="text-orange-400">
            <Link to="/email">Click to login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
