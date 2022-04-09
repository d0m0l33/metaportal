import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEthers } from '@usedapp/core'
import React, { Suspense } from 'react'
  import { Badge, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { SoldierModel } from '../../models/soldierModel'
import { RANDOM_VISOR_COLOR_NAMES } from '../../portalHooks/BadgeHelper'
import { TextBold } from '../../typography/Text'






export function ItemSelection() {
  const { chainId, account } = useEthers()

  const item = useSelector((state: any) => {
    return{index: state.selectedItem.index,
    balance: state.selectedItem.balance,
    holders: state.selectedItem.holders,
    name: state.selectedItem.name,
    address: state.selectedItem.address,
    color: state.selectedItem.color,
    tokenId:state.selectedItem.tokenId,
  }
  })


  return account ?  (     
    <AvatarContainer>

    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, -4], fov: 32 }}>
    <Suspense fallback={null}>
    <OrbitControls enableZoom={false} enablePan={false}/>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <SoldierModel position={[0, -0.9, 0]} color={item.color} />
    </Suspense>
    </Canvas> 
    </AvatarContainer>
  ) : <Container></Container>
}

const AvatarContainer = styled.div`
  height: 100%;
`

const LinkIconWrapper = styled.div`
  width: 12px;
  height: 12px;
  margin-left:5px;
`


const NoItemSelected = styled(TextBold)`
  margin-left: 4px;
  font-size: 14px;
`

const ItemDetail = styled(TextBold)`
  margin-left: 4px;
  font-size: 14px;
`

const ItemAddressWrapper = styled.div`
  display: flex;
  font-size: 15px;
`

const ItemAddressLink = styled.a`
`
const ItemPreview = styled(TextBold)`
width:60%;
`

const TokenBalance = styled(TextBold)`
  position: absolute;
  bottom: 0;
  right: 0;
  padding:0.25em;
  font-size: 15px;
`
const SectionBreak = styled.div`
  margin-bottom: 20px;
`

const SelectionTitle = styled.h2`
`