import { useRef } from 'react';
import '../styles/taskform.css';


export default function TaskForm(){
    const nameRef = useRef(null)
    const textRef = useRef(null)
    const statusRef = useRef(null)

    const createTask = async (e) => {
        try {
            await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameRef.current.value,
                    text: textRef.current.value,
                    status: statusRef.current.value
                })
            });
        } catch (error) {
            console.log('Error al crear la tarea: ', error)
        }
    }
    
    return(
        <form className='task-form'>
            <div className='task-input'>
                <label htmlFor="name">Nombre de la tarea: </label>
                <input ref={nameRef} type="text" id='name' placeholder='Nombre...' />
            </div>

            <div className='task-input'>
                <label htmlFor="text">Tarea: </label>
                <textarea ref={textRef} id="text" placeholder='Tarea...'></textarea>
            </div>

            <div  className='task-input'>
                <select defaultValue="Pending" ref={statusRef} className='status-task'>
                    <option value="Pending">Pendiente</option>
                    <option value="Progress">En progreso</option>
                    <option value="Done">Completada</option>
                </select>
            </div>

            <button onClick={createTask} className='create-task'>Crear</button>
        </form>
    )
}