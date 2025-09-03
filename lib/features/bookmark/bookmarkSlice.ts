import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

interface BookmarkState {
  bookmarkedProducts: Product[];
}

const initialState: BookmarkState = {
  bookmarkedProducts: [],
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<Product>) => {
      const existingBookmark = state.bookmarkedProducts.find(
        (product) => product.id === action.payload.id
      );
      if (!existingBookmark) {
        state.bookmarkedProducts.push(action.payload);
      }
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      state.bookmarkedProducts = state.bookmarkedProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    toggleBookmark: (state, action: PayloadAction<Product>) => {
      const existingBookmark = state.bookmarkedProducts.find(
        (product) => product.id === action.payload.id
      );
      if (existingBookmark) {
        state.bookmarkedProducts = state.bookmarkedProducts.filter(
          (product) => product.id !== action.payload.id
        );
      } else {
        state.bookmarkedProducts.push(action.payload);
      }
    },
    clearBookmarks: (state) => {
      state.bookmarkedProducts = [];
    },
  },
});

export const { addBookmark, removeBookmark, toggleBookmark, clearBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;