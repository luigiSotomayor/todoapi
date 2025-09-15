import '../styles/taskform.css';
import { useState, useEffect } from "react";

export default function TaskForm({ taskToEdit, setTasks, setShowForm }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (taskToEdit) {
      setName(taskToEdit.name);
      setText(taskToEdit.text);
      setStatus(taskToEdit.status);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (taskToEdit) {
        const response = await fetch(`http://localhost:3000/tasks/${taskToEdit._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, text, status }),
        });
        const updated = await response.json();

        if (response.ok) {
          setTasks((prev) =>
            prev.map((t) => (t._id === taskToEdit._id ? updated : t))
          );
          alert("Tarea actualizada");
        } else {
          alert(updated.message || "Error al actualizar");
        }
      } else {
        console.log("Enviando tarea:", { name, text, status });

        const response = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, text, status }),
        });
        const created = await response.json();

        if (response.ok) {
          setTasks((prev) => [...prev, created]);
          alert("Tarea creada");
        } else {
          alert(created.message || "Error al crear");
        }
      }

      setShowForm(false);
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-input">
        <label>Nombre:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="task-input">
        <label>Descripción:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      <div className="task-input">
        <label>Estado:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Progress">Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <button type="submit" className="create-task">
        {taskToEdit ? "Actualizar tarea" : "Crear tarea"}
      </button>
    </form>
  );
}
