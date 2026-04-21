import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin, userSignUp } from "../../API/user";
import { ENDPOINTS } from "../../CONFIGS/api";
import { AuthContext } from "../../Context/Auth";

function LoginSignUpPage({ isSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, isLoggedIn, setUser, setIsLoggedIn } = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("endpoint: ", ENDPOINTS.userlogin);
    if (isSignUp) {
      const res = await userSignUp({ email, password });
      if (res.status != 201) {
        setError(res.data?.detail || "SignUp failed");

        return;
      }
    }
    const res = await userLogin({ email, password });
    if (res.status == 200) {
      localStorage.setItem("Bearer", res.data.token);
      setUser(email.split("@")[0]);
      setIsLoggedIn(true);
      console.log(user, isLoggedIn);
      setError("");

      navigate("/");
    } else {
      setError(res.data?.detail || "Login failed");
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <input type="email" onChange={(e) => setEmail(e.target.value)}></input>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">{isSignUp ? "SignUp" : "Login"}</button>
      </form>
      <div style={{ color: "red" }}>
        {typeof error === "string" ? error : "invalid credential"}
      </div>
    </>
  );
}
export default LoginSignUpPage;
