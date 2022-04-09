import { AxiosResponse } from "axios";
import { TransactionLevel, ParseParams, CriteriaComparions, MetaBadge } from "./BadgeHelperTypes";


export const parseResponseForItems =(response: AxiosResponse): (any[]|null) => {
    if(!response || !response.data || !response.data.data) {
      return null;
    }
    return response.data.data.items;
}
  
  export const RANDOM_VISOR_COLOR_NAMES = [
    'black',
    'white',
    'grey',
    'green',
    'blue',
    'purple',
    'pink',
    'silver',
    'bronze',
    'gold'
  ]

  export const RANDOM_VISOR_COLORS = [
    'black',
    'white',
    'grey',
    '#3f9468',//light green
    '#5093aa',//light blue
    '#9550aa',//light purple
    '#e74f71',//light pink
    'silver',
    '#271f1f',//brown
    'gold'
  ]
  
  export const calculateFrequencyForKeyValueMatches =(
    transactions: any[], 
    key: string, 
    value: number, 
    valueMatching: boolean
    ) : number => {
      if(valueMatching) {
        // matches if 'key' found && key maps to 'value'
        return getKeyValueMatchCount(transactions, key, value);
      } else {
          // matches if 'key' found
          return getKeyMatchCount(transactions, key);
      }
  }

  export const getKeyValueMatchCount = (items: any[], key: string, value: any) =>  {
      let count = 0;
      items.forEach((item) => {
        if(item[key] && item[key] === value) {
          count++;
        }
      });
      return count;
  }

  export const getKeyMatchCount = (items: any[], key: string) =>  {
    let count = 0;
    items.forEach((item) => {
      if(item[key]) {
        count++;
      }
    });
    return count;
}


export const getValidBadges = (badges: MetaBadge[], transactions: any[]) : MetaBadge[] =>  {
  let validBadges: MetaBadge[] = [];
  badges.forEach((badge: MetaBadge) => {
    if(validateBadgeAgainstTransactions(badge,transactions)){
      validBadges.push(badge);
    }
  });
  return validBadges;
}


export const validateBadgeAgainstTransactions = (badge: MetaBadge, transactions: any[]): boolean =>  {
  let isValid = false;
  switch(badge.parseRules.level) {
    case TransactionLevel.Root :
        // compare rules with trnsaction list
        isValid = executeRootLevelChecksForBadge(badge.parseRules,transactions);
      return isValid;
    default:
      return false;
  }
}


export const executeRootLevelChecksForBadge = (rules: ParseParams, transactions: any[]): boolean =>  {
  // defaulting to Key Match frequency comparisons
  return executeFrequencyRuleForBadge(
    rules.keyValueObject.name, 
    rules.keyValueObject.value,
    rules.criteria.comparison,
    rules.criteria.value,
    rules.useKeyValueMatching,
    transactions
    );
}


export const executeFrequencyRuleForBadge = (
  key: string, 
  value: any, 
  criteriaRule: CriteriaComparions,
  criteriaValue: number,
  isValueMathing: boolean,
  transactions: any[], ): boolean =>  {
  // defaulting to Key Match frequency comparisons
  let isValid = false;
  const frequency = calculateFrequencyForKeyValueMatches(transactions, key, value, isValueMathing);

  switch(criteriaRule) {
    case CriteriaComparions.GT : 
      return frequency > criteriaValue;

    case CriteriaComparions.LT : 
      return frequency < criteriaValue;

    default:
      return false;
  }
}