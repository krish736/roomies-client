import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from "./slices/themeSlice.js";
import locationSlice from "./slices/locationSlice.js";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  location: locationSlice, 
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
