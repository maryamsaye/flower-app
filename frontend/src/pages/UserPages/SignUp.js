// frontend/src/pages/SignUp.js
import "./SignUp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../assets/Google.svg";
import AppleLogo from "../../assets/Apple.svg";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

      console.log('Form Data:', { name, email, password });


    try {
      const res = await fetch(
        "https://flower-backend-utgk.onrender.com/api/users/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();
      console.log("Signup response:", data);

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      // Save token if needed
      localStorage.setItem("token", data.data?.token);

      // Redirect user
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Create an account</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}
      </form>

      <div className="social-signup">
        <img src={GoogleLogo} alt="Google signup" />
        <img src={AppleLogo} alt="Apple signup" />
      </div>
    </div>
  );
};

export default SignUp;
