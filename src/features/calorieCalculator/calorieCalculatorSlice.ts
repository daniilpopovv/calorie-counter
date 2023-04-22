import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalorieCalculatorState {
    gender: "male" | "female";
    age: number | null;
    height: number | null;
    weight: number | null;
    activity: "minimal" | "low" | "medium" | "high" | "very_high";
    result: {
        maintenance: number;
        daily: number;
    } | null;
}

const initialState: CalorieCalculatorState = {
    gender: "male",
    age: null,
    height: null,
    weight: null,
    activity: "minimal",
    result: null,
};

export const calorieCalculatorSlice = createSlice({
    name: "calorieCalculator",
    initialState,
    reducers: {
        setGender: (state, action: PayloadAction<"male" | "female">) => {
            state.gender = action.payload;
        },
        setAge: (state, action: PayloadAction<number | null>) => {
            state.age = action.payload;
        },
        setHeight: (state, action: PayloadAction<number | null>) => {
            state.height = action.payload;
        },
        setWeight: (state, action: PayloadAction<number | null>) => {
            state.weight = action.payload;
        },
        setActivity: (state, action: PayloadAction<"minimal" | "low" | "medium" | "high" | "very_high">) => {
            state.activity = action.payload;
        },
        setResult: (
            state,
            action: PayloadAction<{
                maintenance: number;
                daily: number;
            } | null>
        ) => {
            state.result = action.payload;
        },
        resetForm: (state) => {
            state.age = null;
            state.height = null;
            state.weight = null;
            state.result = null;
        },
    },
});

export const {
    setGender,
    setAge,
    setHeight,
    setWeight,
    setActivity,
    setResult,
    resetForm,
} = calorieCalculatorSlice.actions;

export default calorieCalculatorSlice.reducer;
