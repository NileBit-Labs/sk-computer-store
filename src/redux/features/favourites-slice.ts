import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  items: FavouritesItem[];
};

type FavouritesItem = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  status?: string;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};

const initialState: InitialState = {
  items: [],
};

export const Favourites = createSlice({
  name: "Favourites",
  initialState,
  reducers: {
    addItemToFavourites: (state, action: PayloadAction<FavouritesItem>) => {
      const { id, title, price, quantity, imgs, discountedPrice, status } =
        action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id,
          title,
          price,
          quantity,
          imgs,
          discountedPrice,
          status,
        });
      }
    },
    removeItemFromFavourites: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.id !== itemId);
    },

    removeAllItemsFromFavourites: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItemToFavourites,
  removeItemFromFavourites,
  removeAllItemsFromFavourites,
} = Favourites.actions;
export default Favourites.reducer;
