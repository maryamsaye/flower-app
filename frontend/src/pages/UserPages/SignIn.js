import "./SignIn.css";
import { useState } from "react";
import GoogleLogo from "../../assets/Google.svg";
import AppleLogo from "../../assets/Apple.svg";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "", type: "" });

  const navigate = useNavigate();

  const showPopup = (message, type) => {
    setPopup({ show: true, message, type });

    setTimeout(() => {
      setPopup({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleSignIn = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/users/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.data.token);
        showPopup("Sign In successful", "success");
        const redirectPath = localStorage.getItem("redirectAfterLogin");
        setTimeout(() => {
          if (redirectPath) {
            localStorage.removeItem("redirectAfterLogin"); // Clean up
            navigate(redirectPath);
          } else {
            navigate("/home");
        }
      }, 3000);
      } else {
        showPopup(data.error || "Sign In failed", "error");
      }
    } catch (err) {
      console.error(err);
      showPopup("An error occurred", "error");
    }
  };

  return (
    <div className="signin-container">
      {popup.show && (
        <div className={`popup-message ${popup.type}`}>
          {popup.message}
        </div>
      )}

      <div className="signin-box">
        <h2 className="signin-title">Greetings! <br />Welcome to luxury gift shop.</h2>
        <h6>Use your email to sign up or log in</h6>

        <input
          type="email"
          className="signin-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="signin-input"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="signin-continue" onClick={handleSignIn}>CONTINUE</button>

        <h6>Instantly login or sign up via Google</h6>

        <button className="social-button">
          <img src={GoogleLogo} alt="Google" className="icon" />
          CONTINUE WITH GOOGLE
        </button>

        <button className="social-button">
          <img src={AppleLogo} alt="Apple" className="icon" />
          CONTINUE WITH APPLE
        </button>

        <Link to="/signup" className="signup-a" href="/signup"><h4>Sign Up</h4></Link><h4>if you don't have an account</h4>

        <div className="privacy-terms-links">
          <a href="/privacy">Privacy Policy</a><br />
          <a href="/terms">Terms and Conditions</a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;