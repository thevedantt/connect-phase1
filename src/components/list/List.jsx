import Userinfo from "./userinfo/Userinfo"

import "./list.css"
import ChatList from "./chatList/ChatList"

const List = () => {
    return (
      <div className='list'>
        <Userinfo/>
        <ChatList/>
      </div>
    )
  }
  
  export default List