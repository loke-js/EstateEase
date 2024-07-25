import { useContext } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";

function ProfileUpdatePage() {

  const {currentUser,updateUser} = useContext(AuthContext);
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form action="">
            <h1>Update Profile</h1>
            <div className="item">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" defaultValue={currentUser.username} />
            </div>
            <div className="item">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" defaultValue={currentUser.email}/>
            </div>
            <div className="item">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
            </div>
            <button>Update</button>
        </form>
      </div>
      <div className="sideContainer"> 
        <img src={currentUser.avatar || "/noavatar.jpg"} alt="" className="avatar" />
      </div>
    </div>
  )
}

export default ProfileUpdatePage
