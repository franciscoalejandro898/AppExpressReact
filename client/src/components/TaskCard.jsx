import React from 'react'
import { UseTask } from '../context/TaskProvider'
import { useNavigate } from 'react-router-dom'


function TaskCard({ task }) {
  const { deleteTask, toggleTaskDone } = UseTask()
  const navigate = useNavigate()

  const handleDone = async () => {
    await toggleTaskDone(task.id)
  }


  return (
    <div className='bg-zinc-700 capitalize text-white rounded-md p-4'>
      <header className='flex justify-between'>
        <h2 className='text-sm font-bold'>{task.title}</h2>
        <span>{task.done == 1 ? "✅" : "❎"}</span>

      </header>
      <p>{task.description}</p>

      <span>{task.createat}</span>
      <div className='flex gap-x-1 '>
        <button
          className='bg-red-500 px-2 py-1 text-white rounded-sm' onClick={() => deleteTask(task.id)}>
          Delete
        </button>
        <button
          className='bg-blue-500 px-2 py-1 text-white rounded-sm' onClick={() => navigate(`/edit/${task.id}`)}>
          Update
        </button>
        <button
          className='bg-green-500 px-2 py-1 text-white rounded-sm' onClick={() => handleDone(task.done)}>
          Toggle Task
        </button>

      </div>
    </div>
  )
}

export default TaskCard
