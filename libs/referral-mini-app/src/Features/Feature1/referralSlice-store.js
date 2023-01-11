import { createSlice } from '@reduxjs/toolkit';

export const referralSlice = createSlice({
  name: 'referralSlice',
  initialState: {
    voucherTemplates: [],
    generatedVouchers: [],
    allEstablishments: [],
    allPartners: [],
    templateLoading: false,
    offset: 1,
    maxOffset: 1,
  },
  reducers: {
    getAllTemplates: (state, action) => {
      if (!action.payload.search) {
        state.voucherTemplates = action.payload.data;
      } else {
        for (let i = 0; i < action.payload.data.length; i++) {
          state.voucherTemplates.push(action.payload.data[i]);
        }
      }
    },
    setAllEstablishment: (state, action) => {
      state.allEstablishments = action.payload;
    },
    setPartners: (state, action) => {
      state.allPartners = action.payload;
    },
    getVouchersIssues: (state, actions) => {
      state.generatedVouchers = actions.payload;
    },
    generateNewVoucher: (state, action) => {
      state.generatedVouchers = [action.payload, ...state.generatedVouchers];
    },
    setTemplateLoadingState: (state, action) => {
      state.templateLoading = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setMaxOffset: (state, action) => {
      state.maxOffset = action.payload;
    },
    updateGeneratedVoucher: (state, action) => {
      state.generatedVouchers = state.generatedVouchers.filter(
        (v) => v.seq !== action.payload.seq
      );
      state.generatedVouchers = [
        ...action.payload.data,
        ...state.generatedVouchers,
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getAllTemplates,
  getVouchersIssues,
  generateNewVoucher,
  setTemplateLoadingState,
  setAllEstablishment,
  setPartners,
  setOffset,
  setMaxOffset,
  updateGeneratedVoucher,
} = referralSlice.actions;

export default referralSlice.reducer;
