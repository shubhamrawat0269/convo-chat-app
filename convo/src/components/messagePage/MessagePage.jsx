import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft, FaImage, FaPlus, FaVideo } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

import { useSelector, useDispatch } from "react-redux";
import uploadFile from "../../utils/helper/uploadFile";
import Avatar from "../avatar/Avatar";
import { setSelectedUserData } from "../../store/slices/userSlice";

const MessagePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });
  const [uploadedImageVideoModal, setUploadImageVideoModal] = useState(false);
  const { socketConnection, selectedUser } = useSelector(
    (state) => state.userData
  );

  const handleUploadImage = async (e) => {
    const uploadPhoto = await uploadFile(e.target.files[0]);
    // console.log(uploadPhoto);
    setMessage((pre) => {
      return {
        ...pre,
        imageUrl: uploadPhoto?.data?.url,
      };
    });
  };

  const handleUploadImageClear = () => {
    setMessage((pre) => {
      return {
        ...pre,
        imageUrl: "",
      };
    });
  };

  const handleUploadVideoClear = () => {
    setMessage((pre) => {
      return {
        ...pre,
        videoUrl: "",
      };
    });
  };

  const handleUploadVideo = async (e) => {
    const uploadVideo = await uploadFile(e.target.files[0]);

    setMessage((pre) => {
      return {
        ...pre,
        videoUrl: uploadVideo?.data?.url,
      };
    });
  };

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", userId);

      socketConnection.on("message-user", (data) => {
        // console.log("user details", data);
        dispatch(setSelectedUserData(data));
      });
    }
  }, [socketConnection, userId]);

  return (
    <>
      <header className="sticky top-0 py-2 px-4 bg-white">
        <div className="flex justify-between items-center">
          <div className="flex gap-3 items-center px-5">
            <Link className="lg:hidden" to={`/`}>
              <FaAngleLeft size={18} />
            </Link>
            <div>
              <Avatar
                width={40}
                userId={selectedUser?.id}
                name={selectedUser?.name}
                imgUrl={selectedUser?.profile}
              />
            </div>
            <div>
              <h3 className="text-sm font-bold">{selectedUser?.name}</h3>
              <p
                className={
                  selectedUser?.online
                    ? "text-green-800 text-sm font-semibold"
                    : "text-sm text-slate-400 font-semibold"
                }
              >
                {selectedUser?.online ? "online" : "offline"}
              </p>
            </div>
          </div>
          <div className="cursor-pointer">
            <HiDotsVertical size={22} />
          </div>
        </div>
      </header>

      {/* show all msg  */}
      <section className="h-[calc(100vh-112px)] overflow-x-hidden overflow-y-auto">
        {message?.imageUrl && (
          <div className="relative w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              className="absolute right-4 top-4 text-white cursor-pointer"
              onClick={handleUploadImageClear}
            >
              <ImCross size={16} />
            </div>
            <div className="bg-white p-3">
              <img
                src={message?.imageUrl}
                width={300}
                height={300}
                alt="uploadImage"
              />
            </div>
          </div>
        )}
        {message?.videoUrl && (
          <div className="relative w-full h-full bg-slate-700 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
            <div
              className="absolute right-4 top-4 text-white cursor-pointer"
              onClick={handleUploadVideoClear}
            >
              <ImCross size={16} />
            </div>
            <div className="bg-white p-3">
              <video
                src={message?.videoUrl}
                width={300}
                height={300}
                alt="uploadVideo"
                controls
                muted
                autoPlay
              />
            </div>
          </div>
        )}
      </section>

      {/* send message  */}
      <section className="bg-white h-14">
        <div className="relative">
          <div
            className="cursor-pointer bg-green-700 text-white"
            onClick={() => setUploadImageVideoModal(!uploadedImageVideoModal)}
          >
            <FaPlus size={20} />
          </div>

          {uploadedImageVideoModal && (
            <div className="absolute bottom-5 left-5 bg-slate-200 px-2 py-3 rounded-md w-36">
              <form className="flex flex-col gap-2">
                <label
                  htmlFor="uploadImage"
                  className="flex justify-center items-center gap-2 p-2 cursor-pointer hover:bg-slate-400"
                >
                  <FaImage size={16} />
                  <p className="text-sm font-bold">Image</p>
                </label>
                <label
                  htmlFor="uploadVideo"
                  className="flex justify-center items-center gap-2 p-2  cursor-pointer hover:bg-slate-400"
                >
                  <FaVideo size={16} />
                  <p className="text-sm font-bold">Video</p>
                </label>

                <input
                  type="file"
                  className="hidden"
                  id="uploadImage"
                  onChange={handleUploadImage}
                />
                <input
                  type="file"
                  className="hidden"
                  id="uploadVideo"
                  onChange={handleUploadVideo}
                />
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MessagePage;
