
import { useGLTF, useAnimations, useTexture } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import * as THREE from 'three'
import ReactDOM from 'react-dom'
import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Color } from 'three'


export type GLTFResult = GLTF & {
    nodes: Record<string, THREE.Mesh>;
    materials: Record<string, THREE.MeshStandardMaterial>;
}



export  function SoldierModel(props:any) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/soldier2.glb') as any;
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh
          geometry={nodes.vanguard_Mesh.geometry}
          material={materials.VanguardBodyMat}
          skeleton={nodes.vanguard_Mesh.skeleton}
        >
         </skinnedMesh>
        <skinnedMesh
          geometry={nodes.vanguard_visor.geometry}
          material={materials.Vanguard_VisorMat}
          skeleton={nodes.vanguard_visor.skeleton}
        >
        <meshStandardMaterial color={ props.color ? props.color : 'grey' } />
        </skinnedMesh>


      </group>
    </group>
  )
}
  

useGLTF.preload('/soldier.glb');
