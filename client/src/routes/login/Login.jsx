import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
function Login() {
  const [error, setError] = useState("");
  const [otpcount,setOtpCount]=useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);
    const username = formData.get("username");

    const password = formData.get("password");
    const otp = formData.get("otp");
    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
        otp,
      });
      // console.log(res.data);
      await updateUser(res.data);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);
    const email = formData.get("email");
    try {
      const res = await apiRequest.post("/auth/sendotp", {
        email
      });
      setOtpCount(count=>count+1);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
          <h1>Welcome back</h1>
    
        <form className="otp" onSubmit={handleSubmit2}>
          <input
            name="email"
            required
            type="text"
            placeholder="Email"
          />
          <button className="button2" isdisabled={isLoading}>{otpcount==0 ? "Send OTP":"Resend OTP"}</button>
        </form>
        
        
        <form  onSubmit={handleSubmit1}>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <input
            name="otp"
            required
            minLength={6}
            maxLength={6}
            type="number"
            placeholder="OTP"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
