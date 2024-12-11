import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    selectedProfileId: null,
  },
  reducers: {
    setSelectedProfileId: (state, action) => {
      state.selectedProfileId = action.payload;
    },
    resetSelectedProfileId: (state) => {
      state.selectedProfileId = null;
    },
  },
});

export const { setSelectedProfileId, resetSelectedProfileId } =
  profileSlice.actions;
export const selectSelectedProfileId = (state) =>
  state.profile.selectedProfileId;

export default profileSlice.reducer;
