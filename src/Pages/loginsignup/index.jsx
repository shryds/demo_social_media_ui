import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin, userSignUp } from "../../API/user";
import { AuthContext } from "../../Context/Auth";

function LoginSignUpPage({ isSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn, setEmail: setAuthEmail } =
    useContext(AuthContext);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        const res = await userSignUp({ email, password });
        if (res.status != 201) {
          setError(
            res.status === 409
              ? "An account with this email already exists."
              : "Sign up failed. Please try again.",
          );

          return;
        }
      }
      const res = await userLogin({ email, password });
      if (res.status == 200) {
        localStorage.setItem("Bearer", res.data.token);
        setUser(email.split("@")[0]);
        setAuthEmail(email);
        setIsLoggedIn(true);
        setError("");

        navigate("/");
      } else {
        setError("Incorrect email or password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };
  return (
    <div className="page">
      <h1 className="page-title">{isSignUp ? "Sign Up" : "Login"}</h1>
      <form className="form-card card" onSubmit={handleLogin}>
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        {error && <div className="form-error">{error}</div>}
      </form>
    </div>
  );
}
export default LoginSignUpPage;
