import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import backgroundImage from "../assets/p2phome3.jpg";

export default function Leaderboard({ darkMode }) {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const updateLeaderboard = () => {
      const savedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
      setLeaderboard(savedScores.slice(0, 5));
    };

    updateLeaderboard();
    window.addEventListener("storage", updateLeaderboard);
    return () => {
      window.removeEventListener("storage", updateLeaderboard);
    };
  }, []);

  const getMedal = (index) => {
    const medals = ["🥇", "🥈", "🥉"];
    return index < 3 ? medals[index] : "🏅";
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Leaderboard Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Mode Overlay */}
      {darkMode && (
        <div className="absolute inset-0 bg-black bg-opacity-50 transition-all duration-300"></div>
      )}

      {/* Leaderboard Container */}
      <div className="relative z-10 w-full max-w-md text-center">
        <h2
          className={`text-4xl font-poppins font-bold mb-6 drop-shadow-lg transition-all duration-300 ${
            darkMode ? "text-yellow-300" : "text-yellow-500"
          }`}
        >
          🏆 Leaderboard 🏆
        </h2>

        <ul
          className={`w-full rounded-lg shadow-xl overflow-hidden p-2 backdrop-blur-md bg-opacity-30 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-dark"
          }`}
        >
          {leaderboard.length > 0 ? (
            leaderboard.map((time, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 flex justify-between items-center font-Montserrat border-b last:border-none text-lg font-semibold transition-all duration-300 
                  ${
                    index === 0
                      ? darkMode
                        ? "text-yellow-400 animate-pulse"
                        : "text-yellow-600 animate-pulse"
                      : darkMode
                      ? "text-gray-300"
                      : "text-dark"
                  }
                `}
              >
                <span className="flex items-center">
                  {getMedal(index)} <span className="ml-2">{index + 1}.</span>
                </span>
                <span className="text-xl">{time} ms</span>
              </motion.li>
            ))
          ) : (
            <p className="text-center p-4 transition-all duration-300 text-gray-400">
              No scores yet!
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}
