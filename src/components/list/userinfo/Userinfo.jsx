import { useState } from "react";
import "./userinfo.css";

const Userinfo = () => {
  // Initialize currentUser with default values
  const [currentUser, setCurrentUser] = useState({
    username: "Guest",
    avatar: "./avatar.png", // Default avatar
  });

  return (
    <div className="userinfo">
      <div className="user">
        <img src={currentUser.avatar} alt="User Avatar" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icon">
        <img src="./more.png" alt="More Options" />
        <img src="./video.png" alt="Video" />
        <img src="./edit.png" alt="Edit Profile" />
      </div>
    </div>
  );
};

export default Userinfo;
