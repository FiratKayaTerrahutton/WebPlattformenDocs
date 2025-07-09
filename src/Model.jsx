import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

export function Model(props) {
  const { nodes, materials } = useGLTF('/3DModel/TerrahuttonLogotype_White 2.glb')
  const ref = useRef()

  useFrame((state, delta) => {
    ref.current.rotation.y += delta * 0.5
    ref.current.rotation.z += delta * 0.5
    ref.current.rotation.x += delta * 0.5
  })

  return (
    <group {...props} dispose={null} ref={ref}>
      {React.cloneElement(
        <mesh geometry={nodes.Node1.geometry} material={materials.x1} />,
        { children: props.children }
      )}
    </group>
  )
}

useGLTF.preload('/3DModel/TerrahuttonLogotype_White 2.glb')
