import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { AuthContext } from "../../Context/Auth";

function NavBar() {
  const { user, setUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  function handleLogout() {
    localStorage.removeItem("Bearer");
    setUser("");
    setIsLoggedIn(false);
  }
  return (
    <nav className="navbar">
      <div className="nav-container">
        <h2 className="logo">MyApp</h2>

        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink className="nav-link">{user}</NavLink>
              <NavLink className="nav-link" onClick={handleLogout}>
                logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/user/login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="/user" className="nav-link">
                Signup
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
