import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    country: 'India', 
    state: 'Madhya Pradesh', 
    city: 'Indore', 
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation(state, payload) {
        console.log(payload, 19171)
    }
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
