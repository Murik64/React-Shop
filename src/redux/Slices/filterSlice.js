import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  categoryId: 0,
  page: 0,
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
    order: 'desc'
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload
    },
    setSort(state, action) {
      state.sort = action.payload
    },
    setPage(state, action) {
      state.page = action.payload
    },
  }
});

export const { setCategoryId, setSort, setPage } = filterSlice.actions;

export default filterSlice.reducer;