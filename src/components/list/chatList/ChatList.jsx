import { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "./adduser";
import { useSUsertore } from "../../../userStore";
import { doc, onSnapshot } from "firebase/firestore"; // Added the missing import for onSnapshot
import { db } from "../../../lib/firebase"; // Ensure the path to your Firebase setup is correct

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);

  // Assuming you already have the user store working, so we keep using that
  const { currentUser } = useSUsertore();

  useEffect(() => {
    if (currentUser?.uid) {
      const unsub = onSnapshot(doc(db, "userchats", currentUser.uid), async (res) => {
        const items = res.data().chats;

        const promisses = items.map(async (item) => {
          // Placeholder for any async processing logic
        });
      });

      return () => {
        unsub(); // Unsubscribe on cleanup to avoid memory leaks
      };
    }
  }, [currentUser?.uid]);

  return (
    <div className="ChatList">
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>

      {/* Dynamic chat items */}
      {chats.map((chat) => (
        <div className="item" key={chat.chatId}>
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <span>Manager</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {/* Additional static chat items */}
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>Tejas</span>
          <p>Hey, how are you?</p>
        </div>
      </div>

      {/* Static chat items */}
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>Mayur</span>
          <p>Hey, how are you?</p>
        </div>
      </div>

      {/* Dynamic chat items from Firestore */}
      {chats &&
        Object.entries(chats).map(([key, chat]) => (
          <div className="item" key={key}>
            <img src={chat.avatar || "/avatar.png"} alt="" />
            <div className="texts">
              <span>{chat.username || "Unknown"}</span>
              <p>{chat.lastMessage || "No message available"}</p>
            </div>
          </div>
        ))}

      {/* Add user functionality */}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
