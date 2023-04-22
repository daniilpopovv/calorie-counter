import { configureStore } from "@reduxjs/toolkit";
import calorieCalculatorReducer from "./features/calorieCalculator/calorieCalculatorSlice";

export const store = configureStore({
    reducer: {
        calorieCalculator: calorieCalculatorReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
