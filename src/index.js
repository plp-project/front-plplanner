import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TaskContext";
import { CategoryProvider } from "./contexts/CategoryContext";
import { PlanningProvider } from "./contexts/PlanningContext";
import { ReminderProvider } from "./contexts/ReminderContext";
import { GoalProvider } from "./contexts/GoalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ReminderProvider>
        <GoalProvider>
          <PlanningProvider>
            <TaskProvider>
              <CategoryProvider>
                <App />
              </CategoryProvider>
            </TaskProvider>
          </PlanningProvider>
        </GoalProvider>
      </ReminderProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
