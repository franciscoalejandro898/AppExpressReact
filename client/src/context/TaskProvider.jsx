import { createContext, useContext, useState } from 'react'
import { getTasksRequest, toggleTaskRequest } from "../api/tasks.api";
import { deleteTaskRequest } from "../api/tasks.api";
import { createTaskRequest } from "../api/tasks.api";
import { getTaskRequest } from "../api/tasks.api";
import { updateTaskRequest } from "../api/tasks.api";



export const TaskContext = createContext()

export const UseTask = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error('UseTask must be used within a TaskContextProvider')
    }
    return context


}




export const TaskContextProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])
    //funcion para cargar las tareas(todas)
    async function loadTasks() {
        const response = await getTasksRequest();
        setTasks(response.data)
    }
    //funcion para eliminar una tarea
    const deleteTask = async (id) => {
        try {
            const response = await deleteTaskRequest(id)
            console.log(response)

            setTasks(tasks.filter(task => task.id !== id))

        } catch (error) {
            console.error(error)
        }

    }
    //funcion para crear una tarea
    const createTask = async (task) => {
        try {
            const response = await createTaskRequest(task);
            console.log(response)

        } catch (error) {
            console.log(error)
        }

    }

    //funcion para obtener una tarea por id
    const getTask = async (id) => {
        try {
            const response = await getTaskRequest(id)
            return response.data
        } catch (error) {
            console.error(error)
        }
    };


    const updateTask = async (id, newFields) => {
        try {
            const response = updateTaskRequest(id, newFields)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }


    const toggleTaskDone = async (id) => {
        try {
            const taskFound = tasks.find((task) => task.id === id)
            await toggleTaskRequest(id, taskFound.done === 0 ? true : false)
            setTasks(tasks.map((task) =>
                (task.id === id ? { ...task, done: !task.done } : task)))
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <TaskContext.Provider value=
            {{
                tasks,
                loadTasks,
                deleteTask,
                createTask,
                getTask,
                updateTask,
                toggleTaskDone
            }}>
            {children}
        </TaskContext.Provider>
    )

}