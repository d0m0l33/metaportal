import axios, { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { getValidBadges, parseResponseForItems } from './BadgeHelper'
import { ChainId, useEthers } from '@usedapp/core'
import { getTransactionsFor } from './TransactionsAPI'
import { MetaBadge } from './BadgeHelperTypes'
import { BADGE_LIST, DEFAULT_BADGELIST } from './Badges'



export function useBadgeList(signerAddress: string|null|undefined, overrideChainId?: ChainId, tags?: string[]) {
  const { account, chainId } = useEthers();
  const adjustedChainId = chainId === 31337 ? ChainId.Mainnet : chainId;

  console.log('chainId : ',chainId)
  const [badges, setBadges] = useState<MetaBadge[]>()
  useEffect(() => {
    getTransactionsFor(signerAddress, adjustedChainId)
      .then(async (response) => {
        if (response) {
            const transactionItems = parseResponseForItems(response);
            console.log(transactionItems)
            if(transactionItems) {
                const badges = getValidBadges(BADGE_LIST,transactionItems);
                badges.push(DEFAULT_BADGELIST[0]);
                badges.push(DEFAULT_BADGELIST[1]);

                setBadges(badges);
            } else {
                // should do something with this case
                // in theory there should always be the defalt badge
                // if an account is connected
                setBadges(undefined);
            }
        } else {
          const errorMessage = 'Couldnt fetch transaction data';
          return Promise.reject(new Error(errorMessage))
        }
      })
      .catch((err) => {
        console.log(err)
        setBadges(undefined)
      })
  }, [account,chainId])
  return badges
}
