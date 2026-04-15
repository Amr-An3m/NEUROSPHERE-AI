import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Cpu, 
  Brain, 
  Network, 
  Globe, 
  Zap, 
  Shield, 
  Microscope,
  Car,
  Bot,
  Lock,
  ChevronDown,
  Sparkles,
  Terminal
} from 'lucide-react'

// Navigation Component
function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navItems = [
    { label: 'Portal', icon: Sparkles },
    { label: 'Core', icon: Brain },
    { label: 'Knowledge', icon: Network },
    { label: 'Worlds', icon: Globe },
    { label: 'Timeline', icon: Zap },
  ]
  
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-panel py-3' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-orbitron text-xl font-bold neural-text">
            NEUROSPHERE
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <button 
              key={i}
              className="flex items-center gap-2 text-white/70 hover:text-cyan-400 transition-colors group"
            >
              <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
        
        <button className="glass-panel px-4 py-2 rounded-lg text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition-colors">
          Enter Lab
        </button>
      </div>
    </motion.nav>
  )
}

// Hero Section
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative z-10">
      <div className="text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="mb-6 inline-block">
            <span className="glass-panel px-4 py-2 rounded-full text-cyan-400 text-sm font-medium tracking-wider">
              <Sparkles className="w-4 h-4 inline mr-2" />
              WELCOME TO THE FUTURE
            </span>
          </div>
          
          <h1 className="font-orbitron text-6xl md:text-8xl font-black mb-6 neural-text neural-glow">
            NEUROSPHERE
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 mb-4 font-light">
            3D Artificial Intelligence Universe
          </p>
          
          <p className="text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Step into a digital cosmos where neural networks come alive. 
            Explore the infinite possibilities of AI through an immersive 
            three-dimensional experience.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <button className="glass-panel px-8 py-4 rounded-xl text-cyan-400 font-orbitron font-bold hover:bg-cyan-500/20 transition-all group">
              <span className="flex items-center gap-2">
                Enter The Portal
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </span>
            </button>
            
            <button className="glass-panel px-6 py-4 rounded-xl text-white/70 hover:text-white transition-colors">
              <Terminal className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ChevronDown className="w-8 h-8 text-cyan-400/50" />
        </motion.div>
      </div>
    </section>
  )
}

// AI Core Section
function AICoreSection() {
  const features = [
    { icon: Brain, label: 'Neural Processing', value: '99.9%' },
    { icon: Cpu, label: 'Compute Power', value: '∞ PFLOPS' },
    { icon: Network, label: 'Network Nodes', value: '10B+' },
    { icon: Zap, label: 'Learning Rate', value: 'Exponential' },
  ]
  
  return (
    <section className="min-h-screen flex items-center justify-center relative z-10 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 neural-text">
            AI Core Hub
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            The central intelligence of Neurosphere - a digital brain that processes 
            cosmic data streams and generates infinite possibilities.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-panel p-6 rounded-2xl text-center hover:glow-blue transition-all group"
            >
              <feature.icon className="w-8 h-8 text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <div className="font-orbitron text-2xl font-bold text-white mb-1">
                {feature.value}
              </div>
              <div className="text-white/50 text-sm">{feature.label}</div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 glass-panel p-8 rounded-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-400 font-mono text-sm">SYSTEM ONLINE</span>
          </div>
          
          <div className="font-mono text-sm text-white/70 space-y-2">
            <p>{'>'} Initializing neural network architecture...</p>
            <p>{'>'} Loading deep learning models...</p>
            <p>{'>'} Establishing data stream connections...</p>
            <p>{'>'} <span className="text-cyan-400">Neurosphere AI Core Ready</span></p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Knowledge Nodes Section
function KnowledgeNodesSection() {
  const nodes = [
    {
      title: 'Machine Learning',
      description: 'Algorithms that learn from data, identifying patterns and making predictions without explicit programming.',
      color: 'cyan',
      icon: Cpu,
    },
    {
      title: 'Deep Learning',
      description: 'Multi-layered neural networks capable of learning complex representations and solving intricate problems.',
      color: 'purple',
      icon: Brain,
    },
    {
      title: 'Neural Networks',
      description: 'Interconnected nodes mimicking biological neurons, forming the foundation of modern AI systems.',
      color: 'green',
      icon: Network,
    },
  ]
  
  return (
    <section className="min-h-screen flex items-center justify-center relative z-10 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 neural-text">
            Knowledge Nodes
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Explore the fundamental pillars of artificial intelligence 
            through interactive three-dimensional nodes.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {nodes.map((node, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`glass-panel p-8 rounded-2xl hologram-border group cursor-pointer hover:scale-105 transition-all duration-500`}
              style={{ '--bg-color': 'rgba(5, 10, 20, 0.8)' } as React.CSSProperties}
            >
              <div className={`w-16 h-16 rounded-xl bg-${node.color}-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <node.icon className={`w-8 h-8 text-${node.color}-400`} />
              </div>
              
              <h3 className="font-orbitron text-xl font-bold text-white mb-4">
                {node.title}
              </h3>
              
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {node.description}
              </p>
              
              <div className="flex items-center gap-2 text-sm">
                <span className={`text-${node.color}-400`}>Explore Node</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className={`text-${node.color}-400`}
                >
                  →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// AI Worlds Section
function AIWorldsSection() {
  const worlds = [
    {
      title: 'Medical AI',
      description: 'Revolutionizing healthcare with predictive diagnostics and personalized treatments.',
      icon: Microscope,
      color: '#ff6b6b',
      stats: ['95% Diagnostic Accuracy', '10M+ Lives Analyzed', 'Real-time Monitoring'],
    },
    {
      title: 'Autonomous Vehicles',
      description: 'Self-driving systems navigating the world with superhuman precision.',
      icon: Car,
      color: '#4ecdc4',
      stats: ['0.001s Reaction Time', '360° Awareness', '99.99% Safety Rate'],
    },
    {
      title: 'Robotics',
      description: 'Intelligent machines augmenting human capabilities across industries.',
      icon: Bot,
      color: '#ffe66d',
      stats: ['1M+ Robots Deployed', '24/7 Operation', 'Adaptive Learning'],
    },
    {
      title: 'Cyber Security',
      description: 'AI-powered defense systems protecting digital infrastructure.',
      icon: Lock,
      color: '#95e1d3',
      stats: ['1B+ Threats Blocked', 'Zero-day Detection', 'Global Coverage'],
    },
  ]
  
  return (
    <section className="min-h-screen flex items-center justify-center relative z-10 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 neural-text">
            AI Worlds
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Discover how artificial intelligence is transforming every aspect 
            of our universe, one planet at a time.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {worlds.map((world, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-panel p-8 rounded-2xl group hover:scale-[1.02] transition-all cursor-pointer"
              style={{ 
                borderColor: `${world.color}40`,
                boxShadow: `0 0 30px ${world.color}20`
              }}
            >
              <div className="flex items-start gap-6">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${world.color}20` }}
                >
                  <world.icon className="w-8 h-8" style={{ color: world.color }} />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-orbitron text-xl font-bold text-white mb-2">
                    {world.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm mb-4">
                    {world.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {world.stats.map((stat, j) => (
                      <span 
                        key={j}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: `${world.color}20`,
                          color: world.color 
                        }}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Simulation Lab Section
function SimulationLabSection() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const handleSubmit = () => {
    if (!input.trim()) return
    
    setIsProcessing(true)
    setResponse('')
    
    setTimeout(() => {
      const responses = [
        'Analyzing neural patterns... Quantum coherence detected at 99.7%',
        'Processing data streams... Pattern recognition complete.',
        'Neural network optimization in progress... Efficiency increased by 340%',
        'Deep learning models activated. Predictive accuracy: 99.99%',
      ]
      setResponse(responses[Math.floor(Math.random() * responses.length)])
      setIsProcessing(false)
    }, 2000)
  }
  
  return (
    <section className="min-h-screen flex items-center justify-center relative z-10 py-20">
      <div className="max-w-4xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 neural-text">
            AI Simulation Lab
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Interact with the Neurosphere AI core. Enter commands and witness 
            the power of quantum neural processing.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-2xl scan-line"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-white/50 text-sm font-mono">neurosphere_lab_v3.0.exe</span>
          </div>
          
          {/* Output Area */}
          <div className="min-h-[200px] mb-6 font-mono text-sm">
            <div className="text-white/50 mb-2">{'>'} System initialized...</div>
            <div className="text-white/50 mb-2">{'>'} Neural networks online...</div>
            <div className="text-cyan-400 mb-4">{'>'} Ready for input.</div>
            
            {isProcessing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-purple-400"
              >
                {'>'} Processing...
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >
                  _
                </motion.span>
              </motion.div>
            )}
            
            {response && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-green-400 mt-4"
              >
                {'>'} {response}
              </motion.div>
            )}
          </div>
          
          {/* Input Area */}
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter command or query..."
              className="flex-1 bg-black/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-500 font-mono"
              disabled={isProcessing}
            />
            <button
              onClick={handleSubmit}
              disabled={isProcessing || !input.trim()}
              className="glass-panel px-6 py-3 rounded-lg text-cyan-400 font-medium hover:bg-cyan-500/20 transition-colors disabled:opacity-50"
            >
              Execute
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Future Timeline Section
function FutureTimelineSection() {
  const milestones = [
    {
      year: '2025',
      title: 'AI Assistants',
      description: 'Ubiquitous AI companions seamlessly integrated into daily life.',
    },
    {
      year: '2030',
      title: 'Smart Cities',
      description: 'Urban environments optimized by interconnected AI systems.',
    },
    {
      year: '2040',
      title: 'Humanoid Robots',
      description: 'Indistinguishable androids working alongside humans.',
    },
    {
      year: '2050',
      title: 'Space AI',
      description: 'Autonomous systems colonizing and terraforming new worlds.',
    },
  ]
  
  return (
    <section className="min-h-screen flex items-center justify-center relative z-10 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-4xl md:text-5xl font-bold mb-4 neural-text">
            Future Timeline
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Journey through the evolution of artificial intelligence 
            and witness the future unfold.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent" />
          
          {milestones.map((milestone, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`flex items-center gap-8 mb-12 ${
                i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <div className="glass-panel p-6 rounded-xl inline-block">
                  <div className="font-orbitron text-2xl font-bold text-cyan-400 mb-2">
                    {milestone.year}
                  </div>
                  <div className="font-orbitron text-lg text-white mb-2">
                    {milestone.title}
                  </div>
                  <div className="text-white/60 text-sm">
                    {milestone.description}
                  </div>
                </div>
              </div>
              
              <div className="w-4 h-4 rounded-full bg-cyan-500 relative z-10 shadow-lg shadow-cyan-500/50" />
              
              <div className="flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Footer Section
function Footer() {
  return (
    <footer className="relative z-10 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="glass-panel p-12 rounded-2xl text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="font-orbitron text-2xl font-bold neural-text">
              NEUROSPHERE
            </span>
          </div>
          
          <p className="text-white/60 max-w-xl mx-auto mb-8">
            A 3D immersive experience exploring the infinite possibilities 
            of artificial intelligence. Built with Three.js, React, and passion.
          </p>
          
          <div className="flex items-center justify-center gap-6 mb-8">
            <a href="#" className="text-white/50 hover:text-cyan-400 transition-colors">
              <Globe className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/50 hover:text-cyan-400 transition-colors">
              <Terminal className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/50 hover:text-cyan-400 transition-colors">
              <Shield className="w-5 h-5" />
            </a>
          </div>
          
          <div className="text-white/30 text-sm">
            © 2025 Neurosphere AI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main UI Overlay Component
export default function UIOverlay() {
  return (
    <div className="relative z-10">
      <Navigation />
      <HeroSection />
      <AICoreSection />
      <KnowledgeNodesSection />
      <AIWorldsSection />
      <SimulationLabSection />
      <FutureTimelineSection />
      <Footer />
    </div>
  )
}
