import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const goToStartScreen = () => {
    setGameState("start"); // Reset game state
    navigate("/"); // Redirect to home page
  };

  return (
    <nav className="w-full p-4 shadow-lg flex justify-between items-center transition-all duration-300">
      <h1 className="text-lg font-bold font-poppins">Reaction Timer</h1>
      <div className="flex items-center space-x-6">
        <Link
          to="/"
          onClick={goToStartScreen}
          className={`relative text-lg font-poppins  hover:opacity-75 transition-all ${
            location.pathname === "/" ? "font-semibold" : ""
          }`}
        >
          Home
          {location.pathname === "/" && (
            <div className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-purple-500 rounded-full transition-all duration-300"></div>
          )}
        </Link>

        <Link
          to="/leaderboard"
          className={`relative text-lg font-poppins hover:opacity-75 transition-all ${
            location.pathname === "/leaderboard" ? "font-semibold" : ""
          }`}
        >
          Leaderboard
          {location.pathname === "/leaderboard" && (
            <div className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-purple-500 rounded-full transition-all duration-300"></div>
          )}
        </Link>

        {/* Dark Mode Toggle */}
        <div
          onClick={() => setDarkMode(!darkMode)}
          className="relative w-12 h-6 rounded-full flex items-center cursor-pointer transition-all p-1 bg-gray-300 dark:bg-gray-600"
        >
          <div
            className={`w-5 h-5 rounded-full shadow-md transform transition-all duration-300 ${
              darkMode ? "translate-x-6 bg-gray-100" : "translate-x-0 bg-white"
            }`}
          ></div>

          <Sun
            className={`absolute left-1 text-yellow-400 transition-all ${
              darkMode ? "opacity-0" : "opacity-100"
            }`}
            size={16}
          />
          <Moon
            className={`absolute right-1 text-gray-300 transition-all ${
              darkMode ? "opacity-100" : "opacity-0"
            }`}
            size={16}
          />
        </div>
      </div>
    </nav>
  );
}
