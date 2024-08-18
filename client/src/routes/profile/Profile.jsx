import "./profile.scss";
import List from "../../components/list/List";
import Chat from "../../components/chat/Chat";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Suspense, useContext, useEffect } from "react";
function Profile() {
  const data = useLoaderData();
  console.log(data.chatResponse.data);
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
  // const handleUpdate = ()=>{
  //   navigate("/update");
  // }
  return (
    <div className="profile">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update" >
            <button >Update Profile</button>
            </Link>
          </div>
          <div className="info">
           <span>Avatar: <img src={ currentUser.avatar || "/noavatar.jpg"} alt="" /></span>
           <span>Usesname: <b>{currentUser.username}</b></span>
           <span>Email: <b>{currentUser.email}</b></span>
           <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to='/profile/createPost'>
            <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={ <p>Loading....</p> } >
          <Await
          resolve = {data.postResponse}
          errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse)=><List posts={postResponse.data.userPosts}/>}
          </Await> 
          </Suspense>
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={ <p>Loading....</p> } >
          <Await
          resolve = {data.postResponse} 
          errorElement={<p>Error loading posts!</p>}
          >
            {(postResponse)=><List posts={postResponse.data.savedPosts}/>}
          </Await> 
          </Suspense>
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
        <Suspense fallback={ <p>Loading....</p> } >
          <Await
          resolve = {data.chatResponse} 
          errorElement={<p>Error loading chats!</p>}
          >
           {(chatResponse) => <Chat chats={chatResponse.data}/>  }
          </Await> 
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Profile;
