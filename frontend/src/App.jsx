import './App.css'
import TaskForm from './components/TaskForm'
import agenda from './assets/lista-de-verificacion.png'

function App() {

  return (
    <div className="App">
      <h1><img src={agenda} alt='Imagen agenda' /> ToDo List <img src={agenda} alt='Imagen agenda' /></h1>
      <TaskForm />
    </div>
  )
}

export default App
