import { configureStore } from "@reduxjs/toolkit";
import watchListReducer, { loadWatchListState } from "./features/watchListSlice"

// setting up our middleware
const localStorageMiddleware = store => next => action => {

    // updating state after every action finishes getting dispatched
    const result = next(action)

    // set up local storage for our watchlist by saving our watchList to local storage
    localStorage.setItem("watchListState", JSON.stringify(store.getState().watchList))

    return result;
}

// initializing redux store with configureStore
// gives us access to everything we set up in our slices (in this case, our watch list movie data)
export const store = configureStore({
    reducer: {
        watchList: watchListReducer
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), localStorageMiddleware],
    preloadedState: {
        watchList: loadWatchListState()
    }
})