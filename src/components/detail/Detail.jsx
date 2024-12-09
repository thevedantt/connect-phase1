import React from "react";
import "./detail.css";
import { auth } from "../../lib/firebase"; // Ensure this path is correct for your project
import { signOut } from "firebase/auth";

const Detail = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error during logout: ", error.message);
    }
  };

  return (
    <div className="detail">
      <div className="user">
        <img src="./avatar.png" alt="User Avatar" />
        <h2>Vedant Talekar</h2>
        <p>Available</p>
      </div>
      <div className="info">
        <div className="options">
          <div className="option">
            <div className="title">
              <span>Chat Settings</span>
              <img src="./arrowUp.png" alt="Arrow Up" />
            </div>
          </div>
          <div className="option">
            <div className="title">
              <span>Privacy & Help</span>
              <img src="./arrowUp.png" alt="Arrow Up" />
            </div>
          </div>
          <div className="option">
            <div className="title">
              <span>Shared photos</span>
              <img src="./arrowDown.png" alt="Arrow Down" />
            </div>
            <div className="sharedContent">
              <div className="photos">
                <div className="photoItem">
                  <div className="photoDetail">
                    <img
                      src="https://wallpaperaccess.com/full/1112017.jpg"
                      alt="Shared Photo"
                    />
                    <span>photo1.png</span>
                  </div>
                  <img src="./download.png" alt="Download Icon" className="icon" />
                </div>
              </div>
            </div>
          </div>
          <div className="option">
            <div className="title">
              <span>Shared files</span>
              <img src="./arrowUp.png" alt="Arrow Up" />
            </div>
          </div>
        </div>
        <button>Block User</button>
        <button className="logout" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Detail;
