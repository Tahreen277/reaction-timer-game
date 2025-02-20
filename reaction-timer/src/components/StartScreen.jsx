import { Play } from "lucide-react"; 
import { motion } from "framer-motion"; 

export default function StartScreen({ setGameState }) {
  const playSound = () => {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2489/2489-preview.mp3"); 
    audio.play().catch(error => console.error("Audio playback error:", error));
    setGameState("wait");
  };

  return (
    <div 
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/p2phome.jpg')" }}
    >
      <h1 className="text-4xl font-extrabold font-Montserrat mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
        Welcome to Reaction Timer!
      </h1>

      <motion.button
        onClick={playSound}
        className="relative flex font-poppins items-center gap-3 px-8 py-4 text-xl font-semibold rounded-full shadow-lg transition-all text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 active:scale-90"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ boxShadow: ["0px 0px 10px rgba(255, 105, 180, 0.5)", "0px 0px 20px rgba(255, 105, 180, 1)", "0px 0px 10px rgba(255, 105, 180, 0.5)"], transition: { duration: 1.5, repeat: Infinity } }}
      >
        <Play size={28} className="animate-pulse " />
        Start Game
      </motion.button>
    </div>
  );
}
