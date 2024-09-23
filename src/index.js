import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/TaskContext";
import { CategoryProvider } from "./contexts/CategoryContext";
import { PlanningProvider } from "./contexts/PlanningContext";
import { ReminderProvider } from "./contexts/ReminderContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ReminderProvider>
        <PlanningProvider>
          <TaskProvider>
            <CategoryProvider>
              <App />
            </CategoryProvider>
          </TaskProvider>
        </PlanningProvider>
      </ReminderProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
