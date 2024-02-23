import axios from 'axios';




//peticion al backend para obtener todas las tareas
export const getTasksRequest = async () =>
    await axios.get(`http://localhost:4000/tasks`);
//peticion al backend para crear tarea
export const createTaskRequest = async (tasks) =>
    await axios.post(`http://localhost:4000/tasks`, tasks)

//peticion HTTp para eliminar por id
export const deleteTaskRequest = async (id) =>
    await axios.delete(`http://localhost:4000/task/${id}`)


//Peticion traer una tarea por id
export const getTaskRequest = async (id) =>
    await axios.get(`http://localhost:4000/task/${id}`)

//Peticion para actualizar una tarea(por id)

export const updateTaskRequest = async (id, newFields) =>
    await axios.put(`http://localhost:4000/task/${id}`, newFields)

//Peticion para actualizar toggle de tarea

export const toggleTaskRequest = async (id, done) => 
    await axios.put(`http://localhost:4000/task/${id}`, {done})
