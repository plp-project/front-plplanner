import React, { useState, useEffect } from "react";
import FloatingTimer from "./FloatingTimer";

const TimerManager = ({ timers, removeTimer }) => {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col space-y-4 z-50">
      {timers.slice(0, 3).map((timer, index) => (
        <FloatingTimer
          key={index}
          time={timer.time}
          totalDuration={timer.totalDuration}
          onClose={() => removeTimer(timer.taskId)}
          onFinishTask={() => timer.finishTask(timer.taskId)}
          onPostponeTask={() => timer.postponeTask(timer.taskId)}
        />
      ))}
    </div>
  );
};

export default TimerManager;
