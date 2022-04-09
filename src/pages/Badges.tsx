import { CHAIN_NAMES, useEthers } from '@usedapp/core'
import React, { useEffect } from 'react'
import { Badge, Form } from 'react-bootstrap'
import styled from 'styled-components'
import { AccountButton } from '../components/account/AccountButton'
import { ItemSelection } from '../components/ItemSelection/ItemSelection'
import { updatedSelectedItem } from '../components/TokensList/SelectedItemSlice'
import { TokensList } from '../components/TokensList/TokensList'
import { Shadows } from '../global/styles'
import { useAppDispatch } from '../hooks'
import { MetaBadge } from '../portalHooks/BadgeHelperTypes'
import { useBadgeList } from '../portalHooks/useBadgeList'
import { Text } from '../typography/Text'




export function BadgePage() {
  const { chainId, account, library } = useEthers();
  const badges: MetaBadge[]| undefined = useBadgeList(account);

  const dispatch = useAppDispatch();

  const handleApplyBadgeToAvatar =(index: number) =>  {  
    dispatch (updatedSelectedItem(
      {
        index: index,
        balance: 0,
        holders: 0,
        name: 'noname',
        address: 'noaddress',
        color: null,
      }
    ))
  }

  useEffect(() => {
    // clearing badge selection when
    // account ORR chainID changed
    handleApplyBadgeToAvatar(0);

  }, [account,chainId])

  return (
    <div>
    { account ? (<BadgesPageContainer>

      <BadgeListColumn>
        <BadgeListHeaderRow>
          <BadgeListHeaderInfoColumn>
            <p>Badges based on <b>on-chain activity</b></p>
            {chainId && <Badge pill bg="dark">{CHAIN_NAMES[chainId]}</Badge>}          
            </BadgeListHeaderInfoColumn>
          <BadgeListHeaderDropdownColumn>
            <Form.Select aria-label="Default select example">
              <option>Meta Portal</option>
            </Form.Select>
          </BadgeListHeaderDropdownColumn>
        </BadgeListHeaderRow>
        <BadgeListRow>
          <TokensList />
        </BadgeListRow>
      </BadgeListColumn>

      <AvatarColumn>
        <AvatarHeaderRow>
          <AvatarHeaderXPColumn>
          { account && <Badge pill bg="light" style={{color: 'black'}}>{badges ? (badges.length * 10): 0} XP</Badge>}          
          </AvatarHeaderXPColumn>
          <AvatarHeaderAccountSignInColumn>
              <AccountButton />
          </AvatarHeaderAccountSignInColumn>
        </AvatarHeaderRow>
        <AvatarRow>
          <ItemSelection />
        </AvatarRow>
      </AvatarColumn>

    </BadgesPageContainer>) : 
    (<BadgesPageContainer>
      <Text style={{margin: '0.5em'}}> Connect browser wallet to access portal</Text>
      <AccountButton />
    </BadgesPageContainer>)
  }
  </div>
  )
}

const BadgesPageContainer = styled.div `
  display: flex;
  margin: 1em;
  column-gap: 10px;
  row-gap: 10px;

  flex-flow: wrap-reverse;
`
const BadgeListColumn = styled.div `
  display: flex;
  flex-direction: column;
  flex-grow: 1; 
  box-shadow: ${Shadows.main};
  background-color: aliceblue;

`

const AvatarColumn = styled.div `
  display: flex;
  flex-direction: column;
  flex-grow: 1; 
  background-color: aliceblue;
  box-shadow: ${Shadows.main};
`

const BadgeListHeaderRow = styled.div `
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5em;
  min-height: 60px;
  padding: 0.5em;
  `
  
const BadgeListHeaderInfoColumn = styled.div `
  flex-grow: 4; 
  `

const BadgeListHeaderDropdownColumn = styled.div `
  flex-grow: 1; 
  `
const BadgeListRow = styled.div`
  padding: 0.5em;
  height: 500px;
`

const AvatarHeaderRow = styled.div `
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5em;
  column-gap: 5px;
  min-height: 60px;
  padding: 0.5em;

`

const AvatarRow = styled.div`
  display:flex;
  justify-content: center;
  height: 500px;
  padding: 0.5em;

`

const AvatarHeaderXPColumn = styled.div `
`

const AvatarHeaderAccountSignInColumn = styled.div `
`
