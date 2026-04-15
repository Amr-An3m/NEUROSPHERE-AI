import { Suspense, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NeuralSpace from './components/three/NeuralSpace'
import UIOverlay from './components/three/UIOverlay'
import { Brain, Loader2 } from 'lucide-react'

// Loading Screen Component
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
    
    return () => clearInterval(interval)
  }, [onComplete])
  
  return (
    <motion.div 
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 neural-grid opacity-30" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: [null, -100],
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="relative inline-block">
            {/* Outer Rings */}
            <motion.div
              className="absolute inset-0 border-2 border-cyan-500/30 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              style={{ width: 120, height: 120, margin: -20 }}
            />
            <motion.div
              className="absolute inset-0 border-2 border-purple-500/30 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              style={{ width: 140, height: 140, margin: -30 }}
            />
            
            {/* Main Logo */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-cyan-500 flex items-center justify-center relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
              <Brain className="w-10 h-10 text-white relative z-10" />
            </div>
          </div>
        </motion.div>
        
        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-orbitron text-3xl md:text-4xl font-bold neural-text mb-2"
        >
          NEUROSPHERE
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-white/50 text-sm mb-8"
        >
          Initializing Neural Universe...
        </motion.p>
        
        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 300, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mx-auto"
        >
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"
              initial={{ width: '0%' }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          
          <div className="flex justify-between mt-2 text-xs text-white/40 font-mono">
            <span>Loading Assets</span>
            <span>{Math.min(Math.round(progress), 100)}%</span>
          </div>
        </motion.div>
        
        {/* Loading Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 space-y-2"
        >
          {[
            { label: 'Initializing WebGL', threshold: 20 },
            { label: 'Loading 3D Assets', threshold: 50 },
            { label: 'Building Neural Network', threshold: 75 },
            { label: 'Connecting to Neurosphere', threshold: 90 },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: progress >= step.threshold ? 1 : 0.3,
                x: 0 
              }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="flex items-center justify-center gap-2 text-sm"
            >
              {progress >= step.threshold + 10 ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-green-400"
                >
                  ✓
                </motion.span>
              ) : progress >= step.threshold ? (
                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
              ) : (
                <span className="w-4 h-4 rounded-full border border-white/20" />
              )}
              <span className={progress >= step.threshold ? 'text-white/70' : 'text-white/30'}>
                {step.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cyan-500/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyan-500/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cyan-500/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cyan-500/30" />
    </motion.div>
  )
}

// Main App Component
function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)
  
  useEffect(() => {
    // Preload fonts and check WebGL support
    const checkSupport = () => {
      try {
        const canvas = document.createElement('canvas')
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
        return !!gl
      } catch {
        return false
      }
    }
    
    if (!checkSupport()) {
      alert('WebGL is not supported. Please use a modern browser.')
    }
  }, [])
  
  const handleLoadingComplete = () => {
    setIsLoading(false)
    setTimeout(() => setIsReady(true), 100)
  }
  
  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      
      {isReady && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* 3D Background */}
          <Suspense fallback={null}>
            <NeuralSpace />
          </Suspense>
          
          {/* UI Overlay */}
          <UIOverlay />
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <div className="glass-panel px-4 py-2 rounded-lg text-xs text-white/50 font-mono">
              <span className="text-cyan-400">Scroll</span> to navigate
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default App
