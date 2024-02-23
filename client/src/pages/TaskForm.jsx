
import { Form, Formik } from 'formik'

import { UseTask } from '../context/TaskProvider'
import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function TaskForm() {
    const { createTask, getTask, updateTask } = UseTask()
    const [task, setTask] = useState({
        title: '',
        description: '',

    })


    const params = useParams()
    const navigate = useNavigate()
    // console.log(params)

    useEffect(() => {
        const loadTask = async () => {
            if (params.id) {
                const task = await getTask(params.id)
                setTask({
                    title: task.title,
                    description: task.description
                })
            }
        };
        loadTask()
    }, []);
    return (
        <div className='bg-red'>

            <Formik
                initialValues={task}
                enableReinitialize={true}
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
                    <Form className='bg-slate-300 max-w-sm rounded-md p-4 mx-auto mt-10' onSubmit={handleSubmit}>
                        <div>
                            <h1 className='text-xl font-bold uppercase text-center'>
                                {params.id ? 'Edit Task' : 'Create Task'}
                            </h1>
                            <label className='block'>Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder='Write a title'
                                onChange={handleChange}
                                value={values.title}
                                className='px-2 py-1 rounded-sm w-full'
                            />
                        </div>
                        <div>
                            <label className='block'>Description</label>
                            <textarea
                                name="description"
                                rows="3"
                                placeholder='Write a description'
                                onChange={handleChange}
                                value={values.description}
                                className='px-2 py-1 rounded-sm w-full'
                            ></textarea>
                        </div>
                        <div>
                            <button type="Submit" disabled={isSubmitting} className='block bg-indigo-500 px-2 py-1 p-2 text-center text-white w-full rounded-md'>
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
