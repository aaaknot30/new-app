import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchCount } from './counterAPI';

const initialState = {
  value: 0,
  status: 'idle',
  city: 'SF',
  digitsArr: []
};

export const incrementAsync = createAsyncThunk(
  'counter/fetchCount',
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.city = 'Los Angeles'
      state.digitsArr.push(12)
    },
    decrement: (state) => {
      state.value -= 1;
      state.city = 'Santa Rosa'
      state.digitsArr.push(52)
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
      state.city = 'Eugene'
      state.digitsArr.push(55)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
        state.city = 'Milwaukee'
        state.digitsArr.push(16)
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
        state.city = 'NY'
        state.digitsArr.push(27)
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;
export const selectCity = (state) => state.counter.city;
export const selectStatus = (state) => state.counter.status;
export const selectDigitsArr = (state) => state.counter.digitsArr;


export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
    console.log(getState())
  }
};

export default counterSlice.reducer;
