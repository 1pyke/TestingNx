import { createSlice } from '@reduxjs/toolkit';

export const searchStore = createSlice({
  name: 'provider',
  initialState: {
    value: 66,
    searchInput: '',
    searchFlag: false,
    recentSearches: [],
  },
  reducers: {
    increment: (state, action) => {
      state.value = state.value + action.payload;
    },
    searchInputHandler: (state, action) => {
      (state.searchInput = action.payload),
        (state.searchFlag = !state.searchFlag);
    },
    emptySearchInput: (state, action) => {
      state.searchInput = '';
    },
    saveRecentSearches: (state, action) => {
      state.recentSearches = [...state.recentSearches, action.payload];
      const uniqueAddresses = Array.from(
        new Set(state.recentSearches.map((a) => a.entityID))
      ).map((id) => {
        return state.recentSearches.find((a) => a.entityID === id);
      });
      state.recentSearches = uniqueAddresses;
    },
    DeleteRecentSearch: (state, action) => {
      state.recentSearches = action.payload;
      console.log('/////////////////', action.payload);
      console.log('====================================');
      console.log(state.recentSearches);
      console.log('====================================');
    },
    saveUniqueRecentSearches: (state, action) => {
      console.log('action.payload', action.payload);
      state.recentSearches = action.payload;
      console.log('state.recentSearches', state.recentSearches);
    },
    ChangeSearchFlag: (state, action) => {
      state.searchFlag = true;
    },
  },
});

export const {
  increment,
  searchInputHandler,
  emptySearchInput,
  saveRecentSearches,
  DeleteRecentSearch,
  saveUniqueRecentSearches,
  ChangeSearchFlag,
} = searchStore.actions;
export default searchStore.reducer;
