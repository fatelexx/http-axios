import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {VehicleDto} from '@http-axios/http';
import { getAll } from './thunks';

export interface VehicleState {
  value: number;
  vehicles: Array<VehicleDto>;
}

const initialState: VehicleState = {
  value: 0,
  vehicles: []
}

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      // Add user to the state array
      state.vehicles = action.payload;
    })
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = vehicleSlice.actions

export default vehicleSlice.reducer