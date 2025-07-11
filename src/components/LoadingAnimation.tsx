import React from 'react';
import { motion } from 'framer-motion';
import { Search, Scan, Brain, Shield } from 'lucide-react';

export const LoadingAnimation = () => {
  const steps = [
    { icon: Search, label: 'Fetching Product Data', delay: 0 },
    { icon: Scan, label: 'Scanning Visual Elements', delay: 0.5 },
    { icon: Brain, label: 'AI Pattern Analysis', delay: 1 },
    { icon: Shield, label: 'Generating Report', delay: 1.5 }
  ];

  return (
    <div className="py-16 text-center space-y-8">
      {/* Main Animation */}
      <div className="relative">
        <motion.div
          className="w-32 h-32 mx-auto relative bg-gradient-ai rounded-full shadow-ai"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="absolute inset-4 bg-background rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Search className="w-8 h-8 text-primary" />
          </motion.div>
        </motion.div>

        {/* Scanning Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-ai-primary/20 to-transparent"
          animate={{ x: [-200, 200] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: '100px', height: '128px', margin: 'auto' }}
        />
      </div>

      {/* Status Text */}
      <div className="space-y-4">
        <motion.h3
          className="text-2xl font-bold bg-gradient-ai bg-clip-text text-transparent"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          AI Analysis in Progress
        </motion.h3>
        
        <motion.p
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Our advanced algorithms are examining your product for authenticity markers
        </motion.p>
      </div>

      {/* Progress Steps */}
      <div className="max-w-md mx-auto space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: step.delay, duration: 0.5 }}
            >
              <motion.div
                className="w-10 h-10 bg-gradient-ai rounded-full flex items-center justify-center flex-shrink-0"
                animate={{ 
                  scale: [1, 1.2, 1],
                  boxShadow: ['0 0 0 0 hsl(217 91% 60% / 0.7)', '0 0 0 10px hsl(217 91% 60% / 0)', '0 0 0 0 hsl(217 91% 60% / 0)']
                }}
                transition={{ 
                  delay: step.delay + 0.5, 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatDelay: 2 
                }}
              >
                <Icon className="w-5 h-5 text-primary-foreground" />
              </motion.div>
              
              <div className="flex-1 text-left">
                <motion.p
                  className="font-medium"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ 
                    delay: step.delay + 0.7, 
                    duration: 2, 
                    repeat: Infinity 
                  }}
                >
                  {step.label}
                </motion.p>
              </div>

              <motion.div
                className="w-2 h-2 bg-success rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: step.delay + 1.5, duration: 0.3 }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Loading Bar */}
      <div className="max-w-sm mx-auto">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-ai"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </div>
        <motion.p
          className="text-xs text-muted-foreground mt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Analyzing authenticity patterns...
        </motion.p>
      </div>
    </div>
  );
};