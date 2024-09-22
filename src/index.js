import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TaskContext";
import { CategoryProvider } from "./contexts/CategoryContext";
import { PlanningProvider } from "./contexts/PlanningContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <PlanningProvider>
        <TaskProvider>
          <CategoryProvider>
            <App />
          </CategoryProvider>
        </TaskProvider>
      </PlanningProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
