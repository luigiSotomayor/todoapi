import "../styles/Task.css";
import borrar from "../assets/papelera-xmark.png";
import editar from "../assets/editar.png";

export default function Task({ task, setTasks, onEdit }) {
  const deleteTask = async () => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${task._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();

      if (response.ok) {
        setTasks((prev) => prev.filter((t) => t._id !== task._id));
        alert("Tarea eliminada");
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.log("Error al eliminar la tarea", error);
    }
  };

  const editTask = () => {
    onEdit(task);
  }

  return (
    <div className="task">
      <h4 className="task-name">{task.name}</h4>
      <p className="task-text">{task.text}</p>
      <p className={`task-status ${task.status}`}>{task.status}</p>
      <div className="button-container">
        <button onClick={deleteTask} className="delete-task">
          <img className="icon-app" src={borrar} alt="icono de borrar" />
        </button>
        <button onClick={editTask} className="edit-task">
          <img className="icon-app" src={editar} alt="icono de editar" />
        </button>
      </div>
    </div>
  );
}
