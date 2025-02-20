import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function GameScreen({ setGameState, setReactionTime, bestTime, setBestTime, darkMode }) {
    const [status, setStatus] = useState("waiting");
    const [startTime, setStartTime] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const delay = Math.random() * 3000 + 2000;
        const id = setTimeout(() => {
            setStatus("ready");
            setStartTime(Date.now());
        }, delay);
        setTimeoutId(id);

        return () => clearTimeout(id);
    }, []);

    const handleClick = () => {
        if (status === "waiting") {
            clearTimeout(timeoutId);
            setShowModal(true);
        } else {
            const timeTaken = Date.now() - startTime;
            setReactionTime(timeTaken);
            if (!bestTime || timeTaken < bestTime) {
                setBestTime(timeTaken);
                localStorage.setItem("bestTime", timeTaken);
            }
            setGameState("result");
        }
    };

    return (
        <div
            className={`w-full h-screen flex flex-col items-center justify-center text-3xl font-bold cursor-pointer transition 
        ${status === "ready" ? "bg-green-500" : darkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"}`}
            onClick={handleClick}
        >
            {status === "waiting" ? (
                <motion.div
                    initial={{ opacity: 0.5, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
                    className="flex flex-col items-center"
                >
                    <motion.p
                        className="text-6xl "
                        animate={{ y: [-10, 10, -10] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        ⏳
                    </motion.p>
                    <p className="font-poppins">Get Ready...</p>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1.2, rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 0.3, repeat: Infinity, repeatType: "reverse" }}
                    className="flex flex-col items-center"
                >
                    <motion.p
                        className="text-6xl"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 0.2, repeat: Infinity }}
                    >
                        💥
                    </motion.p>
                    <p className="text-red-500 font-poppins">CLICK NOW!</p>
                </motion.div>
            )}

            {/* Animated Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={`p-6 rounded-lg shadow-lg text-center w-80 sm:w-96
                ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            <h2 className={`text-lg sm:text-xl font-bold font-poppins ${darkMode ? "text-red-400" : "text-red-600 font-poppins"}`}>
                                Too Soon!
                            </h2>
                            <p className={`mt-2 sm:text-2xl font-Montserrat ${darkMode ? "text-gray-300" : "text-gray-600 font-Montserrat"}`}>
                                Try Again.
                            </p>
                            <button
                                className={`mt-4 px-6 py-2 font-poppins rounded-lg font-bold text-sm transition-all duration-300
                                        ${darkMode
                                        ? "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-lg shadow-blue-700/50"
                                        : "bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 shadow-lg shadow-blue-500/50"} 
                                         text-white transform hover:scale-105 active:scale-95`}
                                onClick={() => {
                                    setShowModal(false);
                                    setGameState("start");
                                }}
                            >
                                Okay
                            </button>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
