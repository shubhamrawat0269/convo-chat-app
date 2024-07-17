import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import { FaAngleLeft, FaImage, FaPlus, FaVideo } from "react-icons/fa6";
import { ImCross } from "react-icons/im";

import { useSelector, useDispatch } from "react-redux";
import uploadFile from "../../utils/helper/uploadFile";
import Avatar from "../avatar/Avatar";
import { setSelectedUserData } from "../../store/slices/userSlice";
import Loader from "../loader/Loader";
import { IoMdSend } from "react-icons/io";
import moment from "moment";

const MessagePage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });

  const [allMessages, setAllMessages] = useState([]);
  const [uploadedImageVideoModal, setUploadImageVideoModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentMessageRef = useRef(null);

  useEffect(() => {
    if (currentMessageRef.current) {
      currentMessageRef.current.scrollIntoView({
        behaviour: "smooth",
        block: "end",
      });
    }
  }, [allMessages]);

  const { socketConnection, selectedUser, currentUser } = useSelector(
    (state) => state.userData
  );

  const handleUploadImage = async (e) => {
    const uploadPhoto = await uploadFile(e.target.files[0]);

    setLoading(true);
    setUploadImageVideoModal(!uploadedImageVideoModal);
    setMessage((pre) => {
      return {
        ...pre,
        imageUrl: uploadPhoto?.data?.url,
      };
    });
    setLoading(false);
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

    setLoading(true);
    setUploadImageVideoModal(!uploadedImageVideoModal);

    setMessage((pre) => {
      return {
        ...pre,
        videoUrl: uploadVideo?.data?.url,
      };
    });
    setLoading(false);
  };

  const handleOnChange = (e) => {
    const { value } = e.target;

    setMessage((pre) => {
      return {
        ...pre,
        text: value,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (message?.text || message?.imageUrl || message?.videoUrl) {
      if (socketConnection) {
        socketConnection.emit("new message", {
          sender: currentUser?._id,
          reciever: userId,
          text: message?.text,
          imageUrl: message?.imageUrl,
          videoUrl: message?.videoUrl,
          msgByUserId: currentUser?._id,
        });

        setMessage({
          text: "",
          imageUrl: "",
          videoUrl: "",
        });
      }
    }
  };

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", userId);

      socketConnection.emit("seen", userId);

      socketConnection.on("message-user", (data) => {
        // console.log("user details", data);
        dispatch(setSelectedUserData(data));
      });

      socketConnection.on("message", (data) => {
        // console.log("Message details", data);
        setAllMessages(data);
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
                width={35}
                height={35}
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
      <section className="h-[calc(100vh-105px)] overflow-x-hidden overflow-y-auto px-3 py-2 bg-teal-700">
        {message?.imageUrl && (
          <div className="relative w-full h-full bg-slate-300 bg-opacity-30 flex justify-center items-center rounded overflow-hidden">
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

        {loading && <Loader />}

        {/* all msg shown here  */}
        <div className="flex flex-col gap-2">
          {allMessages?.map((msg, id) => {
            return (
              <div
                key={id}
                ref={currentMessageRef}
                className={`px-2 py-1 bg-white rounded w-fit md:max-w-sm max-w-[280px] lg:max-w-md ${
                  currentUser?._id === msg?.msgByUserId ? "ml-auto" : ""
                }`}
              >
                <div className="w-full">
                  {msg?.imageUrl && (
                    <img
                      src={msg?.imageUrl}
                      className="w-full h-full object-scale-down"
                    />
                  )}
                </div>
                <div className="w-full">
                  {msg?.videoUrl && (
                    <video
                      src={msg?.imageUrl}
                      className="w-full h-full object-scale-down"
                      controls
                    />
                  )}
                </div>
                <p>{msg?.text}</p>
                <p className="text-xs ml-auto w-fit">
                  {moment(msg?.createdAt).format("hh:mm")}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* send message  */}
      <section className="bg-white h-12 flex items-center px-4">
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

        {/* input box  */}
        <form
          className="h-full w-full flex gap-2 items-center"
          onSubmit={onSubmit}
        >
          <input
            type="text"
            placeholder="Type here message...."
            className="py-1 px-4 outline-none w-full h-full"
            value={message?.text}
            onChange={handleOnChange}
          />
          <button>
            <IoMdSend size={20} />
          </button>
        </form>
      </section>
    </>
  );
};

export default MessagePage;
