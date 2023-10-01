import React,{useState} from 'react'
import todoStyle from "./todo.module.css";
import { useGetTodoQuery, useCreateTodoMutation, useDeleteTodoMutation } from '../../api/todoApiService';

function Todos() {

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  
  const { data: tasks, isLoading, isError, error } = useGetTodoQuery('getTodo');
  const [ createTodo ] = useCreateTodoMutation();
  const [ deleteTodo ] = useDeleteTodoMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error : {String(error)}</div>;
  }

  const handleAddTask = () => {
    if (newTaskName.trim() !== '') {
      createTodo({
        content: newTaskName,
        description: newTaskDescription,
        is_completed: false }).unwrap().catch(() => {
          setShowAddTask(true);
          setNewTaskName(newTaskName);
          setNewTaskDescription(newTaskDescription);
        });
        setShowAddTask(false);
        setNewTaskName('');
        setNewTaskDescription('');
    }
  };

  const handleRemoveTask = (id:string) => {
    deleteTodo({id});
  }
  
  return (
    <div className={todoStyle.todo_form}>
      <div className={todoStyle.header}>
        <h3>
          <span>Today</span>
          <small>{new Date().toDateString()}</small>
        </h3>
      </div>
      <div className={todoStyle.task_container}>
        {showAddTask ? (
          <div className={todoStyle.add_task_box}>
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
              <button className={todoStyle.cancel_btn} 
                onClick={() => {setShowAddTask(false); setNewTaskDescription('');setNewTaskName('') }}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button type='submit' onClick={() => setShowAddTask(true)}> Add Task</button>
        )}
        {tasks!.map((task) => (
          <div className={todoStyle.task} key={task.id}>
            <input
              type="checkbox"
              checked={task.is_completed}
            />
            <div className={todoStyle.task_details}>
              <div className={todoStyle.task_name}>{task.content}</div>
              <div className={todoStyle.task_desc}>{task.description}</div>
            </div>
            <div>
              <button className={todoStyle.remove_btn} onClick={() => handleRemoveTask(task.id!)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Todos