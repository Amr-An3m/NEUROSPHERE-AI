import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  EffectComposer, 
  Bloom, 
  ChromaticAberration, 
  Noise,
  Vignette 
} from '@react-three/postprocessing'
import { 
  Stars, 
  Float, 
  Trail, 
  Sparkles,
  Html
} from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Particle System for Data Streams
function DataParticles({ count = 1000 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)
  const [hovered, setHovered] = useState(false)
  
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 100
      positions[i3 + 1] = (Math.random() - 0.5) * 100
      positions[i3 + 2] = (Math.random() - 0.5) * 100
      
      const colorChoice = Math.random()
      if (colorChoice < 0.33) {
        colors[i3] = 0
        colors[i3 + 1] = 0.8
        colors[i3 + 2] = 1
      } else if (colorChoice < 0.66) {
        colors[i3] = 0.6
        colors[i3 + 1] = 0
        colors[i3 + 2] = 1
      } else {
        colors[i3] = 0
        colors[i3 + 1] = 1
        colors[i3 + 2] = 0.6
      }
      
      sizes[i] = Math.random() * 2
    }
    
    return [positions, colors, sizes]
  }, [count])
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1))
    return geo
  }, [positions, colors, sizes])
  
  return (
    <points 
      ref={mesh} 
      geometry={geometry}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <pointsMaterial
        size={hovered ? 0.15 : 0.1}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Neural Network Lines
function NeuralNetwork({ nodeCount = 30 }: { nodeCount?: number }) {
  const group = useRef<THREE.Group>(null)
  
  const { nodes, connections } = useMemo(() => {
    const nodes: THREE.Vector3[] = []
    const connections: number[] = []
    
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new THREE.Vector3(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40
      ))
    }
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 15) {
          connections.push(i, j)
        }
      }
    }
    
    return { nodes, connections }
  }, [nodeCount])
  
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(connections.length * 3)
    
    for (let i = 0; i < connections.length; i++) {
      const node = nodes[connections[i]]
      positions[i * 3] = node.x
      positions[i * 3 + 1] = node.y
      positions[i * 3 + 2] = node.z
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [nodes, connections])
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })
  
  return (
    <group ref={group}>
      {/* Nodes */}
      {nodes.map((node, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={node}>
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshBasicMaterial 
              color={i % 3 === 0 ? '#00ffff' : i % 3 === 1 ? '#a020f0' : '#00ff88'}
            />
          </mesh>
        </Float>
      ))}
      
      {/* Connections */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#00ffff" transparent opacity={0.3} />
      </lineSegments>
    </group>
  )
}

// AI Core Brain Sphere
function AICoreBrain({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null)
  const innerMesh = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.1
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
    if (innerMesh.current) {
      innerMesh.current.rotation.y = -state.clock.elapsedTime * 0.15
      innerMesh.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.08) * 0.1
    }
  })
  
  return (
    <group position={position}>
      {/* Outer Shell */}
      <mesh ref={mesh}>
        <icosahedronGeometry args={[4, 2]} />
        <meshBasicMaterial 
          color="#00ffff" 
          wireframe 
          transparent 
          opacity={0.3}
        />
      </mesh>
      
      {/* Inner Core */}
      <mesh ref={innerMesh}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial 
          color="#a020f0" 
          wireframe 
          transparent 
          opacity={0.5}
        />
      </mesh>
      
      {/* Glow Effect */}
      <pointLight color="#00ffff" intensity={2} distance={20} />
      <pointLight color="#a020f0" intensity={1.5} distance={15} position={[0, 0, 0]} />
      
      {/* Orbiting Particles */}
      {[...Array(8)].map((_, i) => (
        <Trail key={i} width={0.5} length={4} color="#00ffff" attenuation={(t) => t * t}>
          <mesh
            position={[
              Math.cos((i / 8) * Math.PI * 2) * 6,
              Math.sin((i / 8) * Math.PI * 2) * 6,
              0
            ]}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial color="#00ffff" />
          </mesh>
        </Trail>
      ))}
    </group>
  )
}

// Portal Gateway
function PortalGateway({ position = [0, 0, -20] }: { position?: [number, number, number] }) {
  const portal = useRef<THREE.Mesh>(null)
  const ring1 = useRef<THREE.Mesh>(null)
  const ring2 = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (portal.current) {
      portal.current.rotation.z = state.clock.elapsedTime * 0.2
    }
    if (ring1.current) {
      ring1.current.rotation.x = state.clock.elapsedTime * 0.15
      ring1.current.rotation.y = state.clock.elapsedTime * 0.1
    }
    if (ring2.current) {
      ring2.current.rotation.x = -state.clock.elapsedTime * 0.1
      ring2.current.rotation.y = -state.clock.elapsedTime * 0.15
    }
  })
  
  return (
    <group position={position}>
      {/* Main Portal */}
      <mesh ref={portal}>
        <torusGeometry args={[6, 0.3, 16, 100]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
      </mesh>
      
      {/* Outer Ring */}
      <mesh ref={ring1}>
        <torusGeometry args={[7, 0.15, 16, 100]} />
        <meshBasicMaterial color="#a020f0" transparent opacity={0.5} />
      </mesh>
      
      {/* Inner Ring */}
      <mesh ref={ring2}>
        <torusGeometry args={[5, 0.2, 16, 100]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.6} />
      </mesh>
      
      {/* Portal Center Glow */}
      <mesh>
        <circleGeometry args={[5.5, 32]} />
        <meshBasicMaterial 
          color="#000000" 
          transparent 
          opacity={0.9}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Light Effects */}
      <pointLight color="#00ffff" intensity={3} distance={30} position={[0, 0, 2]} />
      <Sparkles count={50} scale={15} size={3} speed={0.5} color="#00ffff" />
    </group>
  )
}

// Knowledge Node
function KnowledgeNode({ 
  position, 
  color, 
  label, 
  onClick 
}: { 
  position: [number, number, number]
  color: string
  label: string
  onClick?: () => void 
}) {
  const mesh = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.3
      mesh.current.rotation.y = state.clock.elapsedTime * 0.2
      const scale = hovered ? 1.3 : 1
      mesh.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1)
    }
  })
  
  return (
    <Float speed={3} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        <mesh 
          ref={mesh}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={onClick}
        >
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial 
            color={color} 
            wireframe 
            transparent 
            opacity={hovered ? 0.8 : 0.5}
          />
        </mesh>
        
        {/* Inner Core */}
        <mesh>
          <octahedronGeometry args={[0.8, 0]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.8}
          />
        </mesh>
        
        {/* Glow */}
        <pointLight color={color} intensity={hovered ? 3 : 1.5} distance={10} />
        
        {/* Label */}
        <Html distanceFactor={10}>
          <div className={`glass-panel px-4 py-2 rounded-lg text-center transition-all duration-300 ${
            hovered ? 'scale-110 opacity-100' : 'scale-100 opacity-70'
          }`}>
            <span className="text-neural-cyan font-orbitron text-sm font-bold">{label}</span>
          </div>
        </Html>
      </group>
    </Float>
  )
}

// AI Planet
function AIPlanet({ 
  position, 
  size, 
  color, 
  label,
  ringColor
}: { 
  position: [number, number, number]
  size: number
  color: string
  label: string
  ringColor: string
}) {
  const planet = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (planet.current) {
      planet.current.rotation.y = state.clock.elapsedTime * 0.1
    }
    if (ring.current) {
      ring.current.rotation.x = Math.PI / 3
      ring.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })
  
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group position={position}>
        {/* Planet */}
        <mesh 
          ref={planet}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
        
        {/* Ring */}
        <mesh ref={ring}>
          <torusGeometry args={[size * 1.8, size * 0.1, 16, 100]} />
          <meshBasicMaterial color={ringColor} transparent opacity={0.6} />
        </mesh>
        
        {/* Atmosphere Glow */}
        <mesh>
          <sphereGeometry args={[size * 1.2, 32, 32]} />
          <meshBasicMaterial 
            color={color}
            transparent 
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>
        
        {/* Light */}
        <pointLight color={color} intensity={hovered ? 2 : 1} distance={15} />
        
        {/* Label */}
        <Html distanceFactor={15} position={[0, -size - 1.5, 0]}>
          <div className="glass-panel px-3 py-1 rounded text-center">
            <span className="text-white font-orbitron text-xs">{label}</span>
          </div>
        </Html>
      </group>
    </Float>
  )
}

// Timeline Station
function TimelineStation({ 
  position, 
  year, 
  title 
}: { 
  position: [number, number, number]
  year: string
  title: string
}) {
  const station = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (station.current) {
      station.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })
  
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group position={position}>
        {/* Station Base */}
        <mesh 
          ref={station}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <cylinderGeometry args={[1, 1.5, 0.5, 8]} />
          <meshStandardMaterial 
            color={hovered ? '#00ffff' : '#a020f0'}
            emissive={hovered ? '#00ffff' : '#a020f0'}
            emissiveIntensity={0.4}
          />
        </mesh>
        
        {/* Hologram */}
        <mesh position={[0, 2, 0]}>
          <coneGeometry args={[0.8, 2, 4]} />
          <meshBasicMaterial 
            color="#00ffff"
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>
        
        {/* Light */}
        <pointLight 
          color={hovered ? '#00ffff' : '#a020f0'} 
          intensity={hovered ? 2 : 1} 
          distance={8} 
        />
        
        {/* Label */}
        <Html distanceFactor={10} position={[0, 3.5, 0]}>
          <div className={`glass-panel px-4 py-2 rounded-lg text-center transition-all duration-300 ${
            hovered ? 'scale-110' : 'scale-100'
          }`}>
            <div className="text-neural-blue font-orbitron text-lg font-bold">{year}</div>
            <div className="text-white text-xs mt-1">{title}</div>
          </div>
        </Html>
      </group>
    </Float>
  )
}

// Camera Controller
function CameraController() {
  const { camera } = useThree()
  const scrollProgress = useRef(0)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress.current = window.scrollY / scrollHeight
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  useFrame(() => {
    const progress = scrollProgress.current
    
    // Camera movement based on scroll
    camera.position.z = 20 - progress * 80
    camera.position.y = Math.sin(progress * Math.PI * 2) * 5
    camera.position.x = Math.cos(progress * Math.PI) * 10
    
    camera.lookAt(0, 0, -30)
  })
  
  return null
}

// Main Scene
function Scene() {
  return (
    <>
      {/* Ambient Lighting */}
      <ambientLight intensity={0.2} />
      
      {/* Stars Background */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0.5} 
        fade 
        speed={0.5}
      />
      
      {/* Data Particles */}
      <DataParticles count={2000} />
      
      {/* Neural Network */}
      <NeuralNetwork nodeCount={25} />
      
      {/* Portal Gateway */}
      <PortalGateway position={[0, 0, -10]} />
      
      {/* AI Core Brain */}
      <AICoreBrain position={[0, 0, -35]} />
      
      {/* Knowledge Nodes */}
      <KnowledgeNode 
        position={[-15, 8, -50]} 
        color="#00ffff" 
        label="Machine Learning"
      />
      <KnowledgeNode 
        position={[15, 8, -50]} 
        color="#a020f0" 
        label="Deep Learning"
      />
      <KnowledgeNode 
        position={[0, -10, -50]} 
        color="#00ff88" 
        label="Neural Networks"
      />
      
      {/* AI Planets */}
      <AIPlanet 
        position={[-20, 5, -70]} 
        size={2.5} 
        color="#ff6b6b" 
        label="Medical AI"
        ringColor="#ff9999"
      />
      <AIPlanet 
        position={[20, 5, -70]} 
        size={2} 
        color="#4ecdc4" 
        label="Autonomous Vehicles"
        ringColor="#7fdfd9"
      />
      <AIPlanet 
        position={[-15, -8, -75]} 
        size={1.8} 
        color="#ffe66d" 
        label="Robotics"
        ringColor="#fff0a0"
      />
      <AIPlanet 
        position={[15, -8, -75]} 
        size={2.2} 
        color="#95e1d3" 
        label="Cyber Security"
        ringColor="#b8f0e6"
      />
      
      {/* Timeline Stations */}
      <TimelineStation 
        position={[-25, 0, -100]} 
        year="2025" 
        title="AI Assistants"
      />
      <TimelineStation 
        position={[-8, 5, -105]} 
        year="2030" 
        title="Smart Cities"
      />
      <TimelineStation 
        position={[8, -3, -110]} 
        year="2040" 
        title="Humanoid Robots"
      />
      <TimelineStation 
        position={[25, 2, -115]} 
        year="2050" 
        title="Space AI"
      />
      
      {/* Camera Controller */}
      <CameraController />
    </>
  )
}

// Post Processing Effects
function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom 
        intensity={1.5}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        height={300}
      />
      <ChromaticAberration offset={[0.002, 0.002]} />
      <Noise opacity={0.03} />
      <Vignette eskil={false} offset={0.1} darkness={0.5} />
    </EffectComposer>
  )
}

// Main Neural Space Component
export default function NeuralSpace() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        <Scene />
        <PostProcessing />
      </Canvas>
    </div>
  )
}
