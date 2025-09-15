import "./App.css";
import TaskForm from "./components/TaskForm";
import agenda from "./assets/lista-de-verificacion.png";
import { useState, useEffect } from "react";
import Task from "./components/Task.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/tasks`);
        const res = await response.json();
        console.log("repuesta del backend: ", res);
        setTasks(res);
        setLoading(false);
      } catch (error) {
        console.log("Error al obtener las tareas:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  return (
  <div className="App">
    <h1 className="title-app">
      <img className="icon-app" src={agenda} alt="icono de agenda" />
      To-Do App
      <img className="icon-app" src={agenda} alt="icono de agenda" />
    </h1>

    {showForm ? (
      <TaskForm 
        taskToEdit={editingTask}
        setTasks={setTasks}
        setShowForm={setShowForm}
      />
    ) : (
      <>
        <button
          onClick={() => setShowForm(true)}
          className="create-button"
        >
          Añadir tarea
        </button>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          (!tasks || tasks.length === 0) ? (
            <h3>Crea una tarea para empezar</h3>
          ) : (
            tasks.map((task, i) => (
              <Task 
                key={i} 
                task={task} 
                setTasks={setTasks} 
                onEdit={handleEditTask} 
              />
            ))
          )
        )}
        <button
          onClick={() => setShowForm(true)}
          className="create-button"
        >
          Añadir tarea
        </button>
      </>
    )}
  </div>
);

}

export default App;
