import React,{useState} from 'react'
import { useMutation } from 'react-query'
import "./todo.css";
import { fetchTask, createTask, deleteTask } from '../../api/todos';
import queryClient from '../../api/query-client';
import useSWR from 'swr'
import { v4 as uuidv4 } from "uuid";

function Todos() {

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  
  const { data: tasks, isLoading, isError, error, mutate } = useSWR('tasks', fetchTask);
  
  const deleteTaskMutation = useMutation(deleteTask, {
    onError: () => {
      queryClient.invalidateQueries('tasks');
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error : {error}</div>;
  }

  const handleAddTask = () => {
    if (newTaskName.trim() !== '') {
      const newTask = {
        content: newTaskName,
        description: newTaskDescription,
        is_completed: false,
        id: uuidv4()
      };
      mutate(createTask(newTask), {
        optimisticData: [...tasks, newTask],
        rollbackOnError: true,
        populateCache: true,
        revalidate: false
      });
    }
  };

  const handleRemoveTask = (id) => {
    deleteTaskMutation.mutate(id)
  }
  
  return (
    <div className='todo-form'>
      <div className="header">
        <h3>
          <span>Today</span>
          <small>{new Date().toDateString()}</small>
        </h3>
      </div>
      <div className="task-container">
        {showAddTask ? (
          <div className="add-task-box">
            <input
              type="text"
              placeholder="Task Name"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
            <textarea
              placeholder="Task Description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <div>
              <button type='submit' onClick={() => handleAddTask()}>
                Add Task
              </button>
              <button className='cancel-btn' 
                onClick={() => {setShowAddTask(false); setNewTaskDescription('');setNewTaskName('') }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button type='submit' onClick={() => setShowAddTask(true)}> Add Task</button>
        )}
        {tasks.map((task) => (
          <div className="task" key={task.id}>
            <input
              type="checkbox"
              checked={task.is_completed}
            />
            <div className="task-details">
              <div className='task-name'>{task.content}</div>
              <div className='task-desc'>{task.description}</div>
            </div>
            <div>
              <button className="remove-btn" onClick={() => handleRemoveTask(task.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Todos