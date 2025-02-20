// import { useState } from "react";
// import StartScreen from "./Components/StartScreen";
// import GameScreen from "./Components/GameScreen";
// import ResultScreen from "./Components/ResultScreen";


// export default function App() {
//   const [gameState, setGameState] = useState("start"); // start, wait, reaction, result
//   const [reactionTime, setReactionTime] = useState(null);
//   const [bestTime, setBestTime] = useState(
//     localStorage.getItem("bestTime") || null
//   );

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
//       {gameState === "start" && <StartScreen setGameState={setGameState} />}
//       {gameState === "wait" && (
//         <GameScreen
//           setGameState={setGameState}
//           setReactionTime={setReactionTime}
//           bestTime={bestTime}
//           setBestTime={setBestTime}
//         />
//       )}
//       {gameState === "result" && (
//         <ResultScreen
//           reactionTime={reactionTime}
//           bestTime={bestTime}
//           setGameState={setGameState}
//         />
//       )}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartScreen from "./Components/StartScreen";
import GameScreen from "./Components/GameScreen";
import ResultScreen from "./Components/ResultScreen";
import Leaderboard from "./components/Leaderboard";
import Navbar from "./components/Navbar";

export default function App() {
  const [gameState, setGameState] = useState("start");
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(
    localStorage.getItem("bestTime") || null
  );
  const [leaderboard, setLeaderboard] = useState(
    JSON.parse(localStorage.getItem("leaderboard")) || []
  );
  useEffect(() => {
    if (reactionTime !== null) {
      const updatedLeaderboard = [...leaderboard, reactionTime].sort((a, b) => a - b).slice(0, 5); // Keep top 5 scores
      setLeaderboard(updatedLeaderboard);
      localStorage.setItem("leaderboard", JSON.stringify(updatedLeaderboard));
    }
  }, [reactionTime]); // Trigger update when reactionTime changes
  

  // Dark mode state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Function to update the leaderboard
  const updateLeaderboard = (newScore) => {
    const savedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const updatedScores = [...savedScores, newScore]
      .sort((a, b) => a - b) // Sort scores in ascending order (lower is better)
      .slice(0, 6); // Keep only top 5 scores

    localStorage.setItem("leaderboard", JSON.stringify(updatedScores));
    setLeaderboard(updatedScores);
  };

  return (
    <Router>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="w-full h-screen">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {gameState === "start" && (
                  <StartScreen setGameState={setGameState} darkMode={darkMode} />
                )}
                {gameState === "wait" && (
                  <GameScreen
                    setGameState={setGameState}
                    setReactionTime={setReactionTime}
                    bestTime={bestTime}
                    setBestTime={setBestTime}
                    darkMode={darkMode}
                  />
                )}
                {gameState === "result" && (
                  <ResultScreen
                    reactionTime={reactionTime}
                    bestTime={bestTime}
                    setGameState={setGameState}
                    darkMode={darkMode}
                    updateLeaderboard={updateLeaderboard} // Pass the function
                  />
                )}
              </>
            }
          />
         <Route path="/leaderboard" element={<Leaderboard darkMode={darkMode} />} />

        </Routes>
      </div>
    </Router>
  );
}
