import '../styles/Task.css';

export default function Task({task, setTasks}){

    const deleteTask = async () => {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${task._id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await response.json();

            if(response.ok){
                setTasks(prev => prev.filter(t => t._id !== task._id))
                alert("Tarea eliminada");
            }else{
                alert(res.message);
            }
        } catch (error) {
            console.log('Error al eliminar la tarea', error)
        }
    }

    return(
        <div className="task">
            <h4 className="task-name">{task.name}</h4>
            <p className="task-text">{task.text}</p>
            <p className={`task-status ${task.status}`}>{task.status}</p>
            <button onClick={deleteTask} className="delete-task">Eliminar</button>
        </div>
    )
}