import { createSlice , PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '../../store'


// Define a type for the slice state
interface SelectedItemState {
    index: number| null,
    tokenId: number|null,
    balance: number|null,
    holders: number| null,
    name: string| null
    address: string| null,
    color: string|null,
  }
  
  // Define the initial state using that type
  const initialState: SelectedItemState = {
      index: null,
      tokenId: null,
      balance: null,
      holders: null,
      name: null,
      address: null,
      color: null,
  }

export const selectedItemSlice = createSlice({
  name: 'selectedItem',
  initialState,

  reducers: {

    updatedSelectedItem: (state, action: PayloadAction<any>) => {
        state.index = action.payload.index;
        state.tokenId = action.payload.tokenId;
        state.balance = action.payload.balance;
        state.holders = action.payload.holders;
        state.name = action.payload.name;
        state.address = action.payload.address;
        state.color = action.payload.color;

    },
  },
})

export const { updatedSelectedItem } = selectedItemSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectedItem = (state: RootState) => {
    return {
        index: state.selectedItem.index,
        tokenId:  state.selectedItem.tokenId,
        balance: state.selectedItem.balance,
        holders: state.selectedItem.holders,
        name: state.selectedItem.name,
        address: state.selectedItem.address,
        color: state.selectedItem.color,
    }
}

export default selectedItemSlice.reducer