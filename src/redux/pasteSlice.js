import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const LOCAL_KEY = "pastes";

const loadPastes = () =>
  JSON.parse(localStorage.getItem(LOCAL_KEY)) || [];

const savePastes = (pastes) =>
  localStorage.setItem(LOCAL_KEY, JSON.stringify(pastes));

const initialState = {
  pastes: loadPastes(),
};

export const pasteSlice = createSlice({
  name: "pastes",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      savePastes(state.pastes);
      toast.success("Paste created");
    },

    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;
        savePastes(state.pastes);
        toast.success("Paste updated");
      } else {
        toast.error("Paste not found");
      }
    },

  removeFromPastes: (state, action) => {
  const pasteId = action.payload;
  const index = state.pastes.findIndex((item) => item._id === pasteId);

  if (index >= 0) {
    state.pastes.splice(index, 1);
    localStorage.setItem("pastes", JSON.stringify(state.pastes));
    toast.success("Paste deleted");
  } else {
    toast.error("Paste not found");
  }
},


    resetToPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem(LOCAL_KEY);
      toast.success("All pastes cleared");
    },
  },
});

export const {
  addToPastes,
  updateToPastes,
  removeFromPastes,
  resetToPastes,
} = pasteSlice.actions;

export default pasteSlice.reducer;
