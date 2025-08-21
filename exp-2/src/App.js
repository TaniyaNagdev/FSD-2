import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleAddOrEditTask = () => {
    if (!task.trim()) return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = task.trim();
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task.trim()]);
    }

    setTask('');
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  return (
    <div className="app-wrapper">
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️' : '🌙'}
      </button>

      <div className="app-container">
        <h1>To-Do App</h1>

        <div className="input-group">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task"
            className="task-input"
          />
          <button onClick={handleAddOrEditTask} className="add-btn">
            {editIndex !== null ? 'Update' : 'Add'} Task
          </button>
        </div>

        <ul className="task-list">
          {tasks.map((t, index) => (
            <li key={index} className="task-item">
              <span>{t}</span>
              <div className="task-actions">
                <button onClick={() => handleEdit(index)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
