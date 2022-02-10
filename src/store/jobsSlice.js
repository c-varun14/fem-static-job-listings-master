import { createSlice } from "@reduxjs/toolkit";
import jobsArray from "../data.json";

const initialState = { jobs: jobsArray, filters: [] };

const jobsFilter = (state, action) => {
  if (action.payload.type === "languages" || action.payload.type === "tools") {
    const newJobs = state.jobs.filter((job) => {
      const type = job[action.payload.type];

      if (type.length === 0) return false;

      const index = type.findIndex((type) => type === action.payload.value);

      if (index === -1) return false;
      return true;
    });
    return newJobs;
  } else {
    const newJobs = state.jobs.filter(
      (job) => job[action.payload.type] === action.payload.value
    );
    return newJobs;
  }
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    addFilter(state, action) {
      const length = state.filters.length;
      const filter = () => {
        state.filters.push(action.payload);
        state.jobs = jobsFilter(
          { jobs: state.jobs },
          { payload: action.payload }
        );
      };
      if (length === 0) {
        filter();
        return;
      }
      state.filters = state.filters.filter((filter) => {
        const type = action.payload.type;
        const value = action.payload.value;
        if (filter.type === type && filter.value === value) return false;
        return true;
      });
      const lengthAfterChecking = state.filters.length;
      if (length === lengthAfterChecking) {
        filter();
      } else if (length > lengthAfterChecking) {
        state.filters.push(action.payload);
      }
    },
    remove(state, action) {
      state.filters = state.filters.filter((filter) => {
        if (action.payload === filter.value) {
          return false;
        }
        return true;
      });
    },
    removeFilter(state, action) {
      let newJobs = [...jobsArray];
      state.filters.map((filter) => {
        newJobs = jobsFilter({ jobs: newJobs }, { payload: { ...filter } });
      });
      state.jobs = newJobs;
    },
    clear(state) {
      state.filters = [];
      state.jobs = jobsArray;
    },
  },
});

export const jobsAction = jobsSlice.actions;

export default jobsSlice.reducer;
