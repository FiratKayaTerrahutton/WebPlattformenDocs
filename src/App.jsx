import './App.css'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Model } from './Model'
import TextRight from './TextRight'
import Sidebar from './sidebar'

const App = () => {
  const [currentPage, setCurrentPage] = useState('introduction')

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas 
        camera={{ position: [0, 0, 10] }}
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#242424']} />
        <OrbitControls />
        <Model
          scale={0.1}
          position={[2, 1, 0]}
          rotation={[0, 0, 0]}
        >
          <meshPhysicalMaterial
            color="#c0c0c0"
            metalness={1.0}
            roughness={0}
          />
        </Model>
        <Environment preset="city" />
      </Canvas>
      <Sidebar onSelect={setCurrentPage} />
      <TextRight page={currentPage} />
    </div>
  )
}

export default App
