import { useState } from "react";

const RegisterForm = () => {
  const [userSignupData, setUserSignupData] = useState({
    name: "",
    email: "",
    password: "",
    profile: "",
  });

  const [uploadPhoto, setUploadPhoto] = useState("");

  const handleUserSignUp = (e) => {
    const { name, value } = e.target;

    setUserSignupData({
      ...userSignupData,
      [name]: value,
    });
  };

  const handleUploadPhoto = (e) => {
    const file = e.target.files[0];
    setUploadPhoto(file);
  };

  return (
    <div className="bg-yellow-800  flex justify-center items-center h-screen">
      <div className="bg-white px-3 lg:px-7 py-10 shadow-lg">
        {/* Top Heading  */}
        <div className="mb-5">
          <h2 className="text-center text-4xl font-bold text-black">Signup</h2>
        </div>

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
              {uploadPhoto?.name
                ? uploadPhoto?.name
                : "Select Photo from device"}
            </div>
          </label>
          <input
            type="file"
            id="profile"
            name="profile"
            placeholder="image url"
            onChange={handleUploadPhoto}
            className="bg-gray-50 border border-gray-400 px-2 py-2 w-96 rounded-md outline-none placeholder-gray-400 hidden"
          />
        </div>

        <div>
          <button
            type="button"
            className="bg-orange-800 hover:bg-orange-600 w-full text-white text-center py-2 font-bold rounded-md"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
