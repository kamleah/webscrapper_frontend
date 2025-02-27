import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice/authSlice';
import userSlice from './userSlice/userSlice';
import historySlice from './historySlice/historySlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  history: historySlice,
  // brand: BrandSlice,
  // grade: GradeSlice,
  // unit: UnitSlice,
  // packsize: PackSizeSlice,
  // leadtime: LeadTimeSlice,
  // category: CategorySlice,
  // modalslice: ModalSlice,
  // product:ProductSlice,
  // carousel:carouselSlice,
  // globalconfigurationsslice: GlobalConfigurationsSlice
});

const persistConfig = {
  key: 'SiVerceWeb',
  version: 1,
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const AppStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(AppStore);
export default AppStore;