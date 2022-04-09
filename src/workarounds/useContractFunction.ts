import { useCallback, useState } from 'react'
import { usePromiseTransaction } from '@usedapp/core/dist/esm/src/hooks/usePromiseTransaction'
import { Contract } from '@ethersproject/contracts'

export const useContractFunction = (
  contract: Contract,
  functionName: string,
  chainId: number | undefined,
  options?: { transactionName?: string }
) => {
  const [events, setEvents] = useState<Record<string, any> | undefined>(
    undefined
  )

  const { promiseTransaction, state } = usePromiseTransaction(chainId, options)

  const send = useCallback(
    async (...args: any[]) => {
      const sendPromise = contract[functionName](...args).then(
        (result: any): Promise<any> => {
          // Need to add chainId here to prevent "TypeError: Unsupported Chain" error message
          result.chainId = chainId
          return result
        }
      )

      const receipt = await promiseTransaction(sendPromise)

      if (receipt) {
        if (receipt.logs && receipt.logs.length > 0) {
          setEvents(receipt.logs.map((log) => contract.interface.parseLog(log)))
        } else {
          setEvents([])
        }
      }
    },
    [contract, functionName, options]
  )

  return { send, state, events }
}