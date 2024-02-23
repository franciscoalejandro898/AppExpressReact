
import { Form, Formik } from 'formik'

import { UseTask } from '../context/TaskProvider'
import { useContext, useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'

function TaskForm() {
    const { createTask, getTask, updateTask } = UseTask()
    const [task, setTask] = useState({
        title: '',
        description: '',
    
    })


    const params = useParams()
    const navigate = useNavigate()
    // console.log(params)

    useEffect( () => {
        const loadTask = async () => {
            if (params.id) {
                const task = await getTask(params.id)
                setTask({
                    title: task.title,
                    description: task.description
                })}
        };
        loadTask()
    }, []);
    return (
        <div>
            <h1>
                {params.id ? 'Edit Task' : 'Create Task'}
            </h1>
            <Formik
                initialValues = {task}
                enableReinitialize = {true}
                onSubmit={async (values, action) => {
                    console.log(values)
                    if (params.id) {
                        await updateTask(params.id, values)
                        navigate('/');
                    } else {
                        await createTask(values)
                        navigate('/');
                    }
                    setTask({
                        title: '',
                        description: ''
                    })
                }}
            >




                {({ handleChange, handleSubmit, values, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <label>Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder='Write a title'
                                onChange={handleChange}
                                value={values.title}
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <textarea
                                name="description"
                                rows="3"
                                placeholder='Write a description'
                                onChange={handleChange}
                                value={values.description}
                            ></textarea>
                        </div>
                        <div>
                            <button type="Submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending' : 'Send'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default TaskForm
