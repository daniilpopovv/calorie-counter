import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const CalorieResult: React.FC = () => {
    const { result } = useSelector(
        (state: RootState) => state.calorieCalculator
    );

    if (!result) {
        return null;
    }

    return (
        <div className={`counter-result${result ? " counter-result_active" : ""}`}>
            <h3>Результаты расчета</h3>
            <p>
                Суточная норма для поддержания функционирования организма:{" "}
                {result.maintenance.toFixed(2)} ккал
            </p>
            <p>
                Суточная норма для поддержания веса: {result.daily.toFixed(2)} ккал
            </p>
        </div>
    );
};

export default CalorieResult;
