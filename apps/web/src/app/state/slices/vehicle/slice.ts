import { createSlice } from '@reduxjs/toolkit'
import {VehicleDto} from '@http-axios/http';
import { create, get, getAll, remove, update } from './thunks';

export interface VehicleState {
  vehicles: Array<VehicleDto>;
  form?: VehicleDto;
  isFormVisible?: boolean;
}

const initialState: VehicleState = {
  vehicles: [],
}

export const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    showForm: (state) => {
      state.isFormVisible = true;
    },
    hideForm: (state) => {
      state.isFormVisible = false;
    },
    resetForm: (state) => {
      state.form = undefined;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAll.fulfilled, (state, action) => {
      // Add user to the state array
      state.vehicles = action.payload;
    })
    builder.addCase(remove.fulfilled, (state, action) => {
      state.vehicles = state.vehicles.filter(v => v.id !== action.payload);
    })
    builder.addCase(create.fulfilled, (state, action) => {
      state.vehicles = [...state.vehicles, {...action.meta.arg, id: action.payload}]
    })
    builder.addCase(get.fulfilled, (state, action) => {
      state.form = action.payload;
    })
    builder.addCase(update.fulfilled, (state, action) => {
      state.vehicles = state.vehicles.map(v => v.id !== action.meta.arg.id ? v : action.meta.arg)
    })
  }
})

// Action creators are generated for each case reducer function
export const { showForm, hideForm, resetForm } = vehicleSlice.actions;

export default vehicleSlice.reducer;