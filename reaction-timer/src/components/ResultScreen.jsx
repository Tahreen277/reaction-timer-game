import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function ResultScreen({ reactionTime, bestTime, setGameState }) {
  const [showConfetti, setShowConfetti] = useState(false);

  const darkMode = document.documentElement.classList.contains("dark");

  useEffect(() => {
    if (reactionTime <= 700) {
      setShowConfetti(true);
      
      const celebrationSound = new Audio("https://assets.mixkit.co/active_storage/sfx/438/438-preview.mp3");
      celebrationSound.play().catch((error) => console.error("Audio playback error:", error));

      setTimeout(() => {
        setShowConfetti(false);
        celebrationSound.pause(); 
        celebrationSound.currentTime = 0; 
      }, 4000);
    }
  }, [reactionTime]);

  return (
    <div
      className={`w-full h-screen flex flex-col items-center justify-center transition-all duration-300 
        ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      {showConfetti && <Confetti numberOfPieces={200} recycle={false} />}

      <div className="flex justify-center text-center">
  <h1 className="text-3xl font-bold relative font-poppins">
    Your Reaction Time: {reactionTime}ms
    {reactionTime <= 700 && (
      <motion.span 
        className="absolute -top-4 -right-4 text-yellow-300 text-2xl" 
        animate={{ scale: [1, 1.5, 1], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
      >
        ✨
      </motion.span>
    )}
  </h1>
</div>


      {reactionTime <= 600 && (
        <motion.p 
          className={`text-lg mt-2 font-semibold font-Montserrat transition-all duration-300 
            ${darkMode ? "text-green-300" : "text-green-500"}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🎉 Awesome! You reacted in {reactionTime}ms!
        </motion.p>
      )}



     <motion.button
         onClick={() => setGameState("start")}
         className="mt-5 px-8 py-3 text-lg font-bold text-white rounded-full shadow-lg 
                    bg-gradient-to-r from-blue-500 to-indigo-600 font-poppins
                    hover:from-indigo-600 hover:to-purple-700 
                    transition-all duration-300 transform hover:scale-110 active:scale-95"
         whileHover={{ scale: 1.1, rotate: 2 }}
         whileTap={{ scale: 0.9 }}
       >
         🔄 Try Again
       </motion.button>
    </div>
  );
}
