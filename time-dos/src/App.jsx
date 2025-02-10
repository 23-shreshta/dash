import { useState, useEffect } from "react";
import { FaTrash, FaPlus } from "react-icons/fa";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [task, setTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim()) {
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      setTask("");
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="app-container">
      <div className="todo-box">
        <h1>✅ To-Do List</h1>
        <div className="input-group">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task..."
          />
          <button onClick={addTask} className="add-btn">
            <FaPlus />
          </button>
        </div>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((t, index) => (
              <li key={index} className="task-item">
                <span>{t}</span>
                <button className="delete-btn" onClick={() => deleteTask(index)}>
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty-state">No tasks yet. Start by adding one! ✨</p>
        )}
      </div>
    </div>
  );
}

export default App;