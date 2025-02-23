import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="fixed top-0 left-0 w-full  p-4 flex justify-between items-center z-50">
     
      <div className="text-xl font-bold text-purple-800 font-poppins dark:text-white">
        Reaction Timer
      </div>

    
      <div className="flex items-center gap-6">
        <a href="/" className="text-purple-500 dark:text-white font-poppins hover:underline">
          Home
        </a>
        <a
          href="/leaderboard"
          className="text-purple-500 dark:text-white font-poppins hover:underline"
        >
          Leaderboard
        </a>

       
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          {darkMode ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
