import React, { useEffect, useState } from "react";
import { todoService } from "../../services/todoService";
import "../../styles/todoStyles.css";

export const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const loadTasks = async () => {
    try {
      const tasksFromServer = await todoService.getTasks();
      setTasks(tasksFromServer);
    } catch (error) {
      if (error.status === 404) {
        console.log("Usuario no encontrado, creando usuario...");
        await todoService.createUser();
        loadTasks();
      } else {
        console.error("Error al cargar tareas:", error.status);
      }
    }
  };

  const addTask = async () => {
    if (inputValue.trim() === "") return;
    const newTask = { label: inputValue, done: false };
    try {
      await todoService.addTask(newTask);
      setInputValue("");
      loadTasks();
    } catch (error) {
      console.error("Error al agregar tarea:", error.status);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await todoService.deleteTask(taskId);
      loadTasks();
    } catch (error) {
      console.error("Error eliminando tarea:", error.status);
    }
  };

  const clearAllTasks = async () => {
    try {
      await todoService.clearAllTasks();
      setTasks([]);
    } catch (error) {
      console.error("Error limpiando tareas:", error.status);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="todo-card">
        <h1 className="todo-title">Mi Lista de Tareas</h1>

        <div className="todo-input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe una tarea..."
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button className="todo-btn-primary" onClick={addTask}>
            Agregar
          </button>
          <button className="todo-btn-danger" onClick={clearAllTasks}>
            Limpiar
          </button>
        </div>

        <ul className="list-unstyled m-0 p-0">
          {tasks.length === 0 ? (
            <li className="no-tasks">No hay tareas</li>
          ) : (
            tasks.map((task) => (
              <li key={task.id} className="todo-list-item">
                {task.label}
                <button
                  className="todo-delete-btn"
                  onClick={() => deleteTask(task.id)}
                >
                  Eliminar
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};
