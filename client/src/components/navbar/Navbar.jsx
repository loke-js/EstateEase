import { useContext, useState } from "react";
import "./navbar.scss";
import {Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {updateUser} = useContext(AuthContext);
  const {currentUser} = useContext(AuthContext);
  return (
    <nav>
      <div className="Left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>EstateEase</span>
        </a>
        <a href="/">Home</a>
        <a href="">About</a>
        <a href="">Contact</a>
        <a href="">Agents</a>
      </div>
      <div className="Right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="Profile">
            <div className="notification">3</div>
            <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="">About</a>
          <a href="">Contact</a>
          <a href="">Agent</a>
          <a href="">Sign in</a>
          <a href="">Sign up</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
