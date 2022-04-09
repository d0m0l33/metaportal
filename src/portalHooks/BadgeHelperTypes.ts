import { ChainId } from "@usedapp/core";

export enum TransactionLevel {
    Root = 0,
    LogEvents
  }
  
  export enum CriteriaComparions {
    GT = 0,
    LT
  }
  
  export interface UIMetadata {
    domainId: number,
    name: string,
    balance: number,
    imageUri: string| null,
    description: string,
    requirements: string[]
    onChain: OnChainEntity| null;
  }

  export interface OnChainEntity {
    chainId: ChainId,
    address: string,
    tokenId: number,
  }
  
  export interface MetaBadge {
    ui : UIMetadata| null;
    parseRules: ParseParams,
  }
  
  export interface RequirementsCriteria {
    comparison : CriteriaComparions,
    value: number
  }
  
  export interface ParseParams {
    level: TransactionLevel,
    keyValueObject: KeyValueObject,
    useKeyValueMatching: boolean,
    criteria: RequirementsCriteria
  }
  
  export interface KeyValueObject {
    name: string,
    value?: boolean|string|number;
  }