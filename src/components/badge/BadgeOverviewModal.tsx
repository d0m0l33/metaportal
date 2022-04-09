import React from 'react'
import styled from 'styled-components'
import { useEthers, getExplorerAddressLink, useEtherBalance, useContractFunction, useContractCall } from '@usedapp/core'
import { TransactionsList } from '../Transactions/History'
import { formatEther } from '@ethersproject/units'
import { BigNumber, utils } from 'ethers'
import { Colors, Shadows, Transitions } from '../../global/styles'
import { ShareIcon } from '../Transactions/Icons'
import { motion } from 'framer-motion'
import { Link } from '../base/Link'
import { RequirementsList } from './BadgeRequirementsList'
import { Contract } from '@ethersproject/contracts'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { updatedSelectedItem } from '../TokensList/SelectedItemSlice'
import { RANDOM_VISOR_COLORS } from '../../portalHooks/BadgeHelper'
import { ERC1155Interface } from '../../interfaces/interfaces'
import { formatUnits } from '@ethersproject/units'
import { Badge } from 'react-bootstrap'


export interface BadgeParams {
  domainName: string,
  name: string, 
  index: number,
  description: string,
  requirements: string[],
  address: string | null,
  chainName: string | null,
  chainId: number,
  tokenId: number,
}


const formatter = new Intl.NumberFormat('en-us', {
  minimumFractionDigits: 4,
  maximumFractionDigits: 4,
})

const formatBalance = (balance: BigNumber | undefined) =>
  formatter.format(parseFloat(formatEther(balance ?? BigNumber.from('0'))))

export type BadgeOverviewModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  badgeParams: BadgeParams
}

export const VisorsABI = [
  "function requestMint(uint256 visorId) public payable",
];



export const BadgeOverviewModal = ({ setShowModal, badgeParams }: BadgeOverviewModalProps) => {
  const { account, chainId, library } = useEthers()
  const balance = useEtherBalance(account)
  const visorInterface = new utils.Interface(VisorsABI)
  const signer = library?.getSigner();
  let contract: Contract|null = null;
  if (badgeParams.address && badgeParams.address !== undefined) {
    contract =  new Contract(badgeParams.address, visorInterface, signer);
  }  
  else {
    contract =  new Contract('0x0000000000000000000000000000000000000000', visorInterface, signer);
  }

  function useERC1155TokenBalance(contractAddress: (string|undefined|null),  account: (string|undefined|null), tokenId:  (number|undefined|null)): any[] {
    const [tokenBalance] =
      useContractCall(
        account &&
        contractAddress && {
            abi: ERC1155Interface,
            address: contractAddress,
            method: 'balanceOf',
            args: [account, tokenId],
          }
      ) ?? []
    return tokenBalance
  }

  const tokenBalance = useERC1155TokenBalance(
    badgeParams.address,
    account,
    badgeParams.tokenId,
    );
  const { send } = useContractFunction(contract, 'requestMint', { signer: signer,  transactionName: 'Mint' });

  const dispatch = useAppDispatch();

  const handleApplyBadgeToAvatar =(index: number| null, tokenId: number| null) =>  {
    dispatch (updatedSelectedItem(
      {
        index: index,
        balance: 0,
        holders: 0,
        name: 'noname',
        address: 'noaddress',
        color: tokenId === null ? RANDOM_VISOR_COLORS[0]: RANDOM_VISOR_COLORS[tokenId],
        tokenId: tokenId
      }
    ));
    
  }

  const doMint = async (visorId: number) => {
    let overrides = {
      value: utils.parseEther('0.1')
    };
    send([visorId],overrides);
  }  
  if (account && chainId) {
    return (
      <ModalBackground onClick={() => setShowModal(false)}>
        <Modal
          onClick={(e) => e.stopPropagation()}
          layout
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <TitleRow>
            Badge Details
            <ClosingButton onClick={() => setShowModal(false)}>+</ClosingButton>
          </TitleRow>
          <DomainRow>
            <Badge pill bg="success">{badgeParams.domainName}</Badge>
          </DomainRow>
       
          <AccountInfo>
          {badgeParams && <AccountAddress>{badgeParams.name}</AccountAddress>}
          {badgeParams && <p>Portal Item : <b>{badgeParams.description}</b></p>}
          {(badgeParams && badgeParams.address) && <p>Network : <b>{badgeParams.chainName}</b> </p>}
          {(badgeParams && badgeParams.address) && <p>Mint : <b>{badgeParams.address}</b> </p>}
          {(badgeParams && badgeParams.address) && <p>Token ID  : <b>{badgeParams.tokenId}</b> </p>}

          {       
            (badgeParams && badgeParams.address) &&
            <LinkWrapper>
              <Link href={getExplorerAddressLink(badgeParams.address, badgeParams.chainId)} target="_blank" rel="noopener noreferrer">
                Show on etherscan
                <LinkIconWrapper>
                  <ShareIcon />
                </LinkIconWrapper>
              </Link>
              {window.isSecureContext && (
                <Link onClick={() => console.log(navigator.clipboard.writeText(badgeParams.address ? badgeParams.address : ''))}>Copy to clipboard</Link>
              )}
            </LinkWrapper>
            }
          {tokenBalance && <BalanceWrapper>Balance : {formatUnits(tokenBalance,0)}</BalanceWrapper> }
          {(badgeParams && badgeParams.address && tokenBalance) && <MintButton onClick={() => doMint(badgeParams.tokenId)} >Mint</MintButton>}   
        
          <ApplyButton onClick={() => handleApplyBadgeToAvatar(
            badgeParams.index, 
            badgeParams.tokenId
             )}>Apply Item</ApplyButton>
          </AccountInfo>
          <HistoryWrapper>
  
            <RequirementsList requirements={badgeParams.requirements}/>
          </HistoryWrapper>
        </Modal>
      </ModalBackground>
    )
  } else {
    setShowModal(false)
    return <div />
  }
}

export const Button = styled.button`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  padding: 5px;
  width: fit-content;
  height: 40px;
  font-size: 14px;
  line-height: 24px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${Colors.Black[900]};
  border: 1px solid ${Colors.Black[900]};
  background-color: transparent;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${Colors.Black[900]};
    color: ${Colors.Yellow[100]};
  }
`

const MintButton = styled(Button)`
  margin-bottom: 5px;
  background-color: ${Colors.Yellow[100]};
`

const ApplyButton = styled(Button)`
  margin-bottom: 5px;
  background-color: ${Colors.Gray[300]};
`

const LinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`

const LinkIconWrapper = styled.div`
  width: 12px;
  height: 12px;
`

const BalanceWrapper = styled.div`
  margin-top: 12px;
`

const HistoryWrapper = styled.div``

const AccountAddress = styled.p`
  font-weight: 700;
  margin-bottom: 10px;
`

const ClosingButton = styled.button`
  display: flex;
  position: absolute;
  top: 8px;
  right: 8px;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  line-height: 1;
  width: 24px;
  height: 24px;
  transform: rotate(45deg);
  transition: ${Transitions.all};

  &:hover {
    color: ${Colors.Yellow[500]};
  }
`

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.5em;
  width: 100%;
  font-size: 20px;
`
const DomainRow = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  font-size: 15px;
  padding-left: 0.5em;
`

const AccountInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em;
  padding: 0.5em;
  border-radius: 10px;
  box-shadow: ${Shadows.main};
  background-color: ${Colors.White};
`

const Modal = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height:fit-content;
  background-color: white;
  box-shadow: ${Shadows.main};
  border-radius: 10px;
  z-index: 3;
  margin-top:6em;
`

const ModalBackground = styled(motion.div)`
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  margin: 0px;
  z-index: 2;
  background-color: rgba(235, 232, 223, 0.5);
  display: flex;
  justify-content: center;
`
