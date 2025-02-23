import { Play } from "lucide-react";
import { motion } from "framer-motion";
import p2phome from "../assets/p2phome3.jpg";

export default function StartScreen({ setGameState }) {
  const playSound = () => {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2489/2489-preview.mp3");
    audio.play().catch((error) => console.error("Audio playback error:", error));
    setGameState("wait");
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen">
      
      <div className="absolute inset-0 w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${p2phome})` }}></div>

      <h1 className="relative text-4xl font-extrabold font-Montserrat mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 z-10 text-center px-4">
        Welcome to Reaction Timer!
      </h1>

     
      <motion.p
        className="relative text-lg sm:text-xl text-center font-semibold text-white font-poppins px-6 py-3 max-w-[80%] sm:max-w-[60%] 
                   z-10 leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        ⚡ <span className="text-yellow-300">Milliseconds matter!</span> Test your reflexes and shatter records.  
        Can you be faster than a blink? 🚀
      </motion.p>

      <motion.button
        onClick={playSound}
        className="relative flex font-poppins items-center gap-3 px-8 py-4 text-xl font-semibold rounded-full shadow-lg transition-all text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 active:scale-90 z-10 mt-6"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0px 0px 10px rgba(255, 105, 180, 0.5)",
            "0px 0px 20px rgba(255, 105, 180, 1)",
            "0px 0px 10px rgba(255, 105, 180, 0.5)"
          ],
          transition: { duration: 1.5, repeat: Infinity }
        }}
      >
        <Play size={28} className="animate-pulse " />
        Start Game
      </motion.button>
    </div>
  );
}
