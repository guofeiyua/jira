import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

export interface ProjectListState {
  openModel: boolean;
}

const initialState: ProjectListState = {
  openModel: false,
};

export const projectListSlice = createSlice({
  name: "projectList",
  initialState,
  reducers: {
    openProjectModel(state) {
      state.openModel = true;
    },
    closeProjectModel(state) {
      state.openModel = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openProjectModel, closeProjectModel } = projectListSlice.actions;

export default projectListSlice.reducer;

export const selectorProjectOpenModel = (state: RootState) =>
  state.projectList.openModel;
