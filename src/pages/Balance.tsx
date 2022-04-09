import React, {useRef, useState } from 'react'

import { formatEther } from '@ethersproject/units'
import { useEtherBalance, useEthers } from '@usedapp/core'
import { ContainerCustom, ContentBlock, ContentRow, MainContent, Section, SectionRow } from '../components/base/base'
import { Label } from '../typography/Label'
import { TextInline } from '../typography/Text'
import { Title } from '../typography/Title'

import { AccountButton } from '../components/account/AccountButton'


import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'

import {SoldierModel} from '../models/soldierModel';
import { OrbitControls } from '@react-three/drei'



const STAKING_CONTRACT = '0x00000000219ab540356cBB839Cbe05303d7705Fa'

export function Balance() {


  return (
    <MainContent>
    <Section>
      <ContentBlock>

    </ContentBlock>
    </Section>
    </MainContent>

  )
}

function Box(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export function BasicBox(props: any) {
  return (
    <mesh>
      <boxBufferGeometry args={[1, 1, 1]} attach="geometry" />
      <meshLambertMaterial attach="geometry" color="hotpink"/>
    </mesh>
  )
}


