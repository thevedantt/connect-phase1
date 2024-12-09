import { useEffect, useState } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import ChatList from "./components/list/chatList/ChatList";
import UserInfo from "./components/list/userinfo/Userinfo";
import Login from "./components/login/login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/lib/firebase";
import { useSUsertore } from "./userStore";

const App = () => {

   const {currentUser , isLoading , fetchUserInfo} = useSUsertore()
  

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser)
  

  if (isLoading) return <div className="loading">Loading....</div>
  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;