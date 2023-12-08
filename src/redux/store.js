import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import budgetReducer from './budgetSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, budgetReducer);

export const store = configureStore({
    reducer: {
        budget: persistedReducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: {
            // Ignore these action types
            ignoredActions: ['persist/PERSIST'],
        },
    }),
});

export const persistor = persistStore(store);

