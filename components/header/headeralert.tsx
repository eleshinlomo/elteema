import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeaderAlert = () => {
  const [isVisible, setIsVisible] = useState(true);
  const messages = [
    {
      text: "Shop directly from",
      highlight: "local sellers"
    },
     {
      text: "Cut out cash transaction",
      highlight: "wahala"
    },
     {
      text: "You are your own",
      highlight: "brand"
    },
    {
      text: "Buy and sell",
      highlight: "anything!"
    },
     {
      text: "Talk and Sell on",
      highlight: "Elteema"
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
    <div className="">
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className=" bg-gradient-to-r from-green-900 to-black text-white text-center py-2  px-2 font-bold"
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

          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
};

export default HeaderAlert;