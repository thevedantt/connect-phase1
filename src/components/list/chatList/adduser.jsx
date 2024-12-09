import { collection, query, where, getDocs, setDoc, serverTimestamp, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../lib/firebase"; // Ensure correct Firebase configuration
import "./addUser.css";

const AddUser = ({ currentUser }) => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        userData.id = querySnapshot.docs[0].id;
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Error searching for user:", err);
    }
  };

  const handleAdd = async () => {
    if (!user || !user.id || !currentUser || !currentUser.uid) {
      console.error("User or Current User is missing 'id' or 'uid'");
      return;
    }

    const chatRef = collection(db, "chats");
    const userChatRef = collection(db, "userchats");

    try {
      // Check if the current user and selected user already have a chat
      const currentUserChatSnapshot = await getDocs(
        query(userChatRef, where("userId", "==", currentUser.uid))
      );

      // If chat doesn't exist, create a new one
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      const chatData = {
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: currentUser.uid,
        updatedAt: Date.now(),
      };

      // Add chat reference to both users
      await updateDoc(doc(userChatRef, user.id), {
        chats: arrayUnion(chatData),
      });

      await updateDoc(doc(userChatRef, currentUser.uid), {
        chats: arrayUnion({
          ...chatData,
          receiverId: user.id,
        }),
      });

      console.log("User added successfully!");
    } catch (err) {
      console.error("Error adding user to chat:", err);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "./avatar.png"} alt="Avatar" />
            <span>{user.username || "Unknown User"}</span>
            <button onClick={handleAdd}>Add User</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddUser;
