import { ChainId } from '@usedapp/core'
import { MetaBadge, CriteriaComparions, TransactionLevel } from './BadgeHelperTypes'

// MetaBadge Model V0
export const DEFAULT_BADGELIST: MetaBadge[] = [
       {
        ui: {
          domainId: 1,
          balance: 0,
          name: 'WAGMI Rank 1',
          imageUri: null,
          description: 'Black Visor',
          requirements: ['Create an ethereum account', 'Be amazing'],
          onChain: {
            chainId: ChainId.Polygon,
            address: '0xF685F5A6bA626c262e0Aeded849d15a71933e8C5',
            tokenId: 0
          },
        },
        parseRules: {
          level: TransactionLevel.Root,
          keyValueObject:  {
            name: '',
            value: 0
          },
          useKeyValueMatching: false,
          criteria: {
            comparison: CriteriaComparions.GT,
            value: 1
          }
        }
      },
      {
        ui: {
          domainId: 1,
          balance: 0,
          name: 'GM Rank 1',
          imageUri: null,
          description: 'White Visor',
          requirements: ['Create an ethereum account','Be awesome'],
          onChain: {
            chainId: ChainId.Polygon,
            address: '0xF685F5A6bA626c262e0Aeded849d15a71933e8C5',
            tokenId: 1
          },
        },
        parseRules: {
          level: TransactionLevel.Root,
          keyValueObject:  {
            name: '',
            value: 0
          },
          useKeyValueMatching: false,
          criteria: {
            comparison: CriteriaComparions.GT,
            value: 0
          }
        }
      },
]

export const BADGE_LIST: MetaBadge[] = [
  {
    ui: {
      domainId: 1,
      balance: 0,
      name: 'Explorer Rank 4',
      imageUri: null,
      description: 'Grey Visor',
      requirements: ['Complete more than 100 successful transactions'],
      onChain: {
        chainId: ChainId.Polygon,

        address: '0xF685F5A6bA626c262e0Aeded849d15a71933e8C5',
        tokenId: 2
      },

    },
    parseRules: {
      level: TransactionLevel.Root,
      keyValueObject:  {
        name: 'successful',
        value: true
      },
      useKeyValueMatching: true,
      criteria: {
        comparison: CriteriaComparions.GT,
        value: 100
      }
    }
  },
  {
    ui: {
      domainId: 1,
      balance: 0,
      name: 'Explorer Rank 3',
      imageUri: null,
      description: 'Green Visor',
      requirements: ['Complete more than 75 successful transactions'],
      onChain: {
        chainId: ChainId.Polygon,

        address: '0xF685F5A6bA626c262e0Aeded849d15a71933e8C5',
        tokenId: 3
      },  
    },
    parseRules: {
      level: TransactionLevel.Root,
      keyValueObject:  {
        name: 'successful',
        value: true
      },
      useKeyValueMatching: true,
      criteria: {
        comparison: CriteriaComparions.GT,
        value: 75
      }
    }
  },
    {
      ui: {
        domainId: 1,
        balance: 0,
        name: 'Explorer Rank 2',
        imageUri: null,
        description: 'Blue Visor',
        requirements: ['Complete more than 50 successful transactions'],
        onChain: {
          chainId: ChainId.Polygon,

          address: '0xF685F5A6bA626c262e0Aeded849d15a71933e8C5',
          tokenId: 4
        },         
      },
      parseRules: {
        level: TransactionLevel.Root,
        keyValueObject:  {
          name: 'successful',
          value: true
        },
        useKeyValueMatching: true,
        criteria: {
          comparison: CriteriaComparions.GT,
          value: 50
        }
      }
    },
    {
      ui: {
        domainId: 1,
        balance: 0,
        name: 'Explorer Rank 1',
        imageUri: null,
        description: 'purple Visor',
        requirements: ['Complete more than 25 successful transactions'],
        onChain: {
          chainId: ChainId.Polygon,

          address: '0xF685F5A6bA626c262e0Aeded849d15a71933e8C5',
          tokenId: 5
        },
      },
      parseRules: {
        level: TransactionLevel.Root,
        keyValueObject:  {
          name: 'successful',
          value: true
        },
        useKeyValueMatching: true,
        criteria: {
          comparison: CriteriaComparions.GT,
          value: 25
        }
      }
    },
    {
      ui: {
        domainId: 1,
        balance: 0,
        name: 'Space Cadet Rank 1',
        imageUri: null,
        description: 'Pink Visor',
        requirements: ['Complete more than 10 successful transactions'],
        onChain: {
          chainId: ChainId.Polygon,

          address: '0xF685F5A6bA626c262e0Aeded849d15a71933e8C5',
          tokenId: 6
        },
      },
      parseRules: {
        level: TransactionLevel.Root,
        keyValueObject:  {
          name: 'successful',
          value: true
        },
        useKeyValueMatching: true,
        criteria: {
          comparison: CriteriaComparions.GT,
          value: 10
        }
      }
    },

    {
      ui: {
        domainId: 1,
        balance: 0,
        name: 'Space Cadet Rank 2',
        imageUri: null,
        description: 'Silver Visor',
        requirements: ['Complete more than 5 successful transactions'],
        onChain: {
          chainId: ChainId.Polygon,

          address: '0xF685F5A6bA626c262e0Aeded849d15a71933e8C5',
          tokenId: 7
        },
      },
      parseRules: {
        level: TransactionLevel.Root,
        keyValueObject:  {
          name: 'successful',
          value: true
        },
        useKeyValueMatching: true,
        criteria: {
          comparison: CriteriaComparions.GT,
          value: 5
        }
      }
    },

  ]