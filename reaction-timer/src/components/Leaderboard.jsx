import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Leaderboard({ darkMode }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [mode, setMode] = useState(darkMode); // Force re-render

  useEffect(() => {
    setMode(darkMode); // Update mode on change
  }, [darkMode]);

  useEffect(() => {
    const updateLeaderboard = () => {
      const savedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
      setLeaderboard(savedScores.slice(0, 5)); // Keep top 5 scores
    };

    updateLeaderboard(); // Initial load
    window.addEventListener("storage", updateLeaderboard);

    return () => {
      window.removeEventListener("storage", updateLeaderboard);
    };
  }, []);

  const getMedal = (index) => {
    const medals = ["🥇", "🥈", "🥉"];
    return index < 3 ? medals[index] : "🏅"; // Gold, Silver, Bronze, then generic medals
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-all duration-300 ${
        mode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h2
        className={`text-4xl font-poppins font-bold mb-6 drop-shadow-lg transition-all duration-300 ${
          mode ? "text-yellow-300" : "text-yellow-500"
        }`}
      >
        🏆 Leaderboard 🏆
      </h2>

      <ul
        className={`w-full max-w-md rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
          mode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
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
                    ? mode
                      ? "text-yellow-400 animate-pulse"
                      : "text-yellow-600 animate-pulse"
                    : mode
                    ? "text-gray-300"
                    : "text-gray-700"
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
  );
}
