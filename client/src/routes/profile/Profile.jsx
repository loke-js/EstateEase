import "./profile.scss";
import List from "../../components/list/List";
import Chat from "../../components/chat/Chat";
import apiRequest from "../../../../api/lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
function Profile() {
  const {updateUser,currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  
  const handleLogout = async ()=>{
    try{
      const res = await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    }catch(error){
      console.log(error);
    }
  }
  return (
    <div className="profile">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button>Update Profile</button>
          </div>
          <div className="info">
           <span>Avatar: <img src={ currentUser.avatar || "/noavatar.jpg"} alt="" /></span>
           <span>Usesname: <b>{currentUser.username}</b></span>
           <span>Email: <b>{currentUser.email}</b></span>
           <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <button>Create New Post</button>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
}

export default Profile;
