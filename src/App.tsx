import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./store";
import CalorieForm from "./components/CalorieForm";
import CalorieResult from "./components/CalorieResult";

const App: React.FC = () => {
  return (
      <Provider store={store}>
        <div className="app">
          <h1>Счетчик калорий</h1>
          <CalorieForm />
          <CalorieResult />
        </div>
      </Provider>
  );
};

export default App;
