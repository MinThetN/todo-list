import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function TimeDisplay() {
  const [time, setTime] = useState(new Date());
  const [isDaytime, setIsDaytime] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = new Date();
      setTime(newTime);
      setIsDaytime(newTime.getHours() >= 6 && newTime.getHours() < 18);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-gradient-to-r from-slate-800/90 to-slate-900/90 
        backdrop-blur-xl p-8 rounded-[2.5rem] shadow-2xl w-full max-w-2xl mx-auto mb-8 
        border border-slate-700/50"
    >
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 opacity-20 mix-blend-overlay transition-opacity duration-1000
          ${isDaytime ? 'bg-gradient-to-tr from-yellow-300 via-orange-300 to-blue-200' 
          : 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-300'}`}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-transparent 
            via-slate-400/10 to-transparent rounded-full"
        />
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Time and Date Section */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r 
              from-slate-100 to-slate-300 tracking-tight mb-2 font-mono"
          >
            {formatTime(time)}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 font-medium tracking-wide"
          >
            {formatDate(time)}
          </motion.div>
        </div>

        {/* Weather Icon Section */}
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{
              rotateZ: isDaytime ? 360 : 0,
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear"
            }}
            className="relative"
          >
            <motion.div
              className={`w-16 h-16 rounded-full ${
                isDaytime 
                  ? 'bg-gradient-to-br from-yellow-200 via-yellow-300 to-orange-400'
                  : 'bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900'
              }`}
              animate={{
                boxShadow: isDaytime 
                  ? [
                      "0 0 20px rgba(250, 204, 21, 0.3)",
                      "0 0 40px rgba(250, 204, 21, 0.5)",
                      "0 0 20px rgba(250, 204, 21, 0.3)"
                    ]
                  : [
                      "0 0 20px rgba(79, 70, 229, 0.2)",
                      "0 0 30px rgba(79, 70, 229, 0.4)",
                      "0 0 20px rgba(79, 70, 229, 0.2)"
                    ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {!isDaytime && (
                <motion.div
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0"
                >
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.8 + 0.2,
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className={`px-6 py-2 rounded-2xl backdrop-blur-md ${
              isDaytime 
                ? 'bg-yellow-400/10 text-yellow-200 border border-yellow-400/20'
                : 'bg-indigo-500/10 text-indigo-200 border border-indigo-500/20'
            }`}
          >
            {isDaytime ? 'Have a nice day' : 'Have a good night'}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default TimeDisplay; 