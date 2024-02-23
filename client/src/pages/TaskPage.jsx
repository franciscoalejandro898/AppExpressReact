import { useEffect, useState } from "react";
import { getTasksRequest } from "../api/tasks.api";
import TaskkCard from "../components/TaskCard";
import TaskCard from "../components/TaskCard";
import { UseTask } from "../context/TaskProvider";




function TaskPage() {
  const {tasks, loadTasks} = UseTask()
  

  useEffect(() => {
    loadTasks()
  }, []);

  //funcion que renderiza el contenido del main
  function renderMain() {
    if (tasks.length === 0) {
      return <h1>No hay tareas, Crea una</h1>
    }else{
    return tasks.map((task) => (<TaskCard task={task} key={task.id} />));
  }}

  return (
    <div>
      <h1 className="text-5xl text-white font-bold text-center ">TaskPage</h1>
      <div className="grid grid-cols-3 gap-2 py-8"> 
      {renderMain()}
      </div>


    </div>
  )
}

export default TaskPage
