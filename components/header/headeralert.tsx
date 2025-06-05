import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeaderAlert = () => {
  const [isVisible, setIsVisible] = useState(true);
  const messages = [
    {
      text: "Shop directly from local sellers.",
      highlight: "ELTEEMA!"
    },
    {
      text: "Free delivery on orders over",
      highlight: "₦10,000"
    },
    {
      text: "New arrivals",
      highlight: "every week!"
    },
    {
      text: "Exclusive deals for",
      highlight: "registered users"
    }
  ];
  const [currentMessage, setCurrentMessage] = useState(0);

  // Rotate messages every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative bg-gradient-to-r from-green-900 to-black text-white text-center py-3 px-4 font-bold"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center"
            >
            
              <h3 className="text-sm sm:text-base">
                {messages[currentMessage].text}{" "}
                <span className="text-green-400 font-extrabold">
                  {messages[currentMessage].highlight}
                </span>
              </h3>
            
            </motion.div>

            <button
              onClick={() => setIsVisible(false)}
              className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
              aria-label="Close alert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HeaderAlert;