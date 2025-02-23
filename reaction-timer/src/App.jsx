import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ResultScreen from "./components/ResultScreen";
import Leaderboard from "./components/Leaderboard";
import Navbar from "./components/Navbar";

export default function App() {
  const [gameState, setGameState] = useState("start");
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(
    localStorage.getItem("bestTime") ? Number(localStorage.getItem("bestTime")) : null
  );
  const [leaderboard, setLeaderboard] = useState(
    JSON.parse(localStorage.getItem("leaderboard")) || []
  );

  useEffect(() => {
    if (reactionTime !== null) {
      const updatedLeaderboard = [...leaderboard, reactionTime]
        .sort((a, b) => a - b)
        .slice(0, 5); 
      setLeaderboard(updatedLeaderboard);
      localStorage.setItem("leaderboard", JSON.stringify(updatedLeaderboard));
    }
  }, [reactionTime]);

  
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  
  const updateLeaderboard = (newScore) => {
    const savedScores = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const updatedScores = [...savedScores, newScore]
      .sort((a, b) => a - b)
      .slice(0, 5);

    localStorage.setItem("leaderboard", JSON.stringify(updatedScores));
    setLeaderboard(updatedScores);
  };

  return (
    <Router>
      <div className="w-full h-screen">
        {/* <Navbar /> */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
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
                    updateLeaderboard={updateLeaderboard}
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