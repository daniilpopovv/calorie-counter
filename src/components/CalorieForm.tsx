import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setGender,
    setAge,
    setHeight,
    setWeight,
    setActivity,
    setResult,
    resetForm,
} from "../features/calorieCalculator/calorieCalculatorSlice";
import {RootState} from "../store";

const CalorieForm: React.FC = () => {
    const dispatch = useDispatch();
    const {gender, age, height, weight, activity} = useSelector(
        (state: RootState) => state.calorieCalculator
    );

    const [errors, setErrors] = useState({
        age: "",
        height: "",
        weight: "",
    });

    const activityOptions = [
        {value: "minimal", label: "Минимальная / Сидячая работа, отсутствие физических нагрузок"},
        {value: "low", label: "Низкая / Редкие, нерегулярные тренировки, активность в быту"},
        {value: "medium", label: "Средняя / Тренировки 3-5 раз в неделю"},
        {value: "high", label: "Высокая / Тренировки 6-7 раз в неделю"},
        {value: "very_high", label: "Очень высокая / Больше 6 тренировок в неделю и физическая работа"},
    ];

    const activityFactors = {
        minimal: 1.2,
        low: 1.375,
        medium: 1.55,
        high: 1.7,
        very_high: 1.9,
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: string
    ) => {
        const value = e.target.value;
        let error = "";

        switch (field) {
            case "age":
                const ageValue = parseInt(value);
                if (isNaN(ageValue) || ageValue < 0) {
                    error = "Введите корректное значение";
                } else if (ageValue > 150) {
                    error = "Возраст не должен быть больше 150";
                }
                dispatch(setAge(ageValue));
                break;
            case "height":
                const heightValue = parseInt(value);
                if (isNaN(heightValue) || heightValue < 0) {
                    error = "Введите корректное значение";
                }
                dispatch(setHeight(heightValue));
                break;
            case "weight":
                const weightValue = parseInt(value);
                if (isNaN(weightValue) || weightValue < 0) {
                    error = "Введите корректное значение";
                }
                dispatch(setWeight(weightValue));
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({...prevErrors, [field]: error}));
    };


    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setGender(e.target.value as "male" | "female"));
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setActivity(e.target.value as "minimal" | "low" | "medium" | "high" | "very_high"));
    };

    const calculateCalories = () => {
        const bmr =
            gender === "male"
                ? 66.5 + 13.75 * weight! + 5.003 * height! - 6.775 * age!
                : 655.1 + 9.563 * weight! + 1.85 * height! - 4.676 * age!;
        const maintenanceCalories = bmr;
        const dailyCalories = bmr * activityFactors[activity];

        dispatch(setResult({maintenance: maintenanceCalories, daily: dailyCalories}));
    };

    const clearForm = () => {
        dispatch(resetForm());
        setErrors({age: "", height: "", weight: ""});
    };

    const isFormValid = !errors.age && !errors.height && !errors.weight && age !== null && height !== null && weight !== null;

    return (
        <div className="calorie-form">
            <h2>Расчет суточной нормы калорий</h2>
            <div className="form-group">
                <label>Пол:</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={handleRadioChange}
                        />
                        Мужчина
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={handleRadioChange}
                        />
                        Женщина
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="age">Возраст:</label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    value={age ?? ""}
                    onChange={(e) => handleChange(e, "age")}
                    className={`form-control${errors.age ? " form-control_error" : ""}`}
                />
                {errors.age && <span className="form-error">{errors.age}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="height">Рост (см):</label>
                <input
                    type="number"
                    id="height"
                    name="height"
                    value={height ?? ""}
                    onChange={(e) => handleChange(e, "height")}
                    className={`form-control${errors.height ? " form-control_error" : ""}`}
                />
                {errors.height && <span className="form-error">{errors.height}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="weight">Вес (кг):</label>
                <input
                    type="number"
                    id="weight"
                    name="weight"
                    value={weight ?? ""}
                    onChange={(e) => handleChange(e, "weight")}
                    className={`form-control${errors.weight ? " form-control_error" : ""}`}
                />
                {errors.weight && <span className="form-error">{errors.weight}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="activity">Физическая активность:</label>
                <select
                    id="activity"
                    name="activity"
                    value={activity}
                    onChange={handleSelectChange}
                    className="form-control"
                >
                    {activityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={calculateCalories}
                    disabled={!isFormValid}
                >
                    Рассчитать
                </button>
                <button type="button" className="btn btn-secondary" onClick={clearForm}>
                    Очистить поля
                </button>
            </div>
        </div>
    );
};

export default CalorieForm;
