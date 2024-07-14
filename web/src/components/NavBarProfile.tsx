import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import "../styles/Navbar.css";

export default function NavBar() {
  const navigate = useNavigate();

  const getUserID = (): string | null => {
    return localStorage.getItem("user_id");
  };

  const isUserLoggedIn = (): boolean => {
    return getUserID() !== null;
  };

  function handleLogOut() {
    localStorage.removeItem("user_id");
    navigate("/");
  }

  return (
    <div className="bg-navy py-6">
      <nav className="container mx-auto flex justify-between items-center ml-100">
        <div className="flex items-center space-x-8">
          <Link to="/" className="px-6">
            <span className="text-offwhite font-title text-4xl">RESTORE</span>
          </Link>
          <Link to="/" className="px-6">
            <span className="menu-item text-offwhite text-lg">MAP</span>
          </Link>
          <Link to="/about" className="px-6">
            <span className="menu-item text-offwhite text-lg">ABOUT</span>
          </Link>
          <Link to="/social" className="px-6">
            <span className="menu-item text-offwhite text-lg">LEADERBOARD</span>
          </Link>
        </div>
        <div className="flex items-center">
          {isUserLoggedIn() && (
            <>
              <button onClick={handleLogOut} className="menu-icon">
                <LogoutIcon fontSize="large" className="text-offwhite" />
              </button>
              <button onClick={handleLogOut} className="text-primary ml-2">
                LOGOUT
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}