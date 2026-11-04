"use client";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { restoreFavourites } from "./features/favourites-slice";

const FAVOURITES_KEY = "sk-computer-store:favourites:v1";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVOURITES_KEY);
      if (saved) {
        const items = JSON.parse(saved);
        if (Array.isArray(items)) {
          store.dispatch(restoreFavourites(items.filter((item) => item && (typeof item.id === "string" || typeof item.id === "number") && typeof item.title === "string" && typeof item.price === "number")));
        }
      }
    } catch {
      // Browsing remains available if storage is disabled or data is invalid.
    }

    let previousItems = store.getState().FavouritesReducer.items;
    const unsubscribe = store.subscribe(() => {
      const items = store.getState().FavouritesReducer.items;
      if (items === previousItems) return;
      previousItems = items;
      try { localStorage.setItem(FAVOURITES_KEY, JSON.stringify(items)); } catch { /* Storage may be unavailable. */ }
    });
    return unsubscribe;
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
