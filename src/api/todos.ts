import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line no-undef
type Task = {
  id?:string ,
  content: string,
  description: string,
  is_completed: boolean
}

const apiKey = "Bearer c6669c72a45113aa347c235b8a49e3406011bcd1";
const client = axios.create({
  baseURL: "https://api.todoist.com/rest/v2/tasks",
  headers: {
    Authorization: apiKey,
    "X-Request-Id": uuidv4(),
    "Content-Type": "application/json",
  },
});

let tasks:Task[] = [];

const fetchTask = async () => {
  const response = await client.get('/');
  tasks = response.data;
  return tasks;
};

const createTask = async (newTaskData: Task) => {
    const response = await client.post("", newTaskData);
    tasks = [...tasks, response.data];
    return tasks;
};

const deleteTask = async (id: string) => {
  await client.delete(id);
  tasks = tasks.filter((task: Task) => task.id !== id);

  return tasks;
};

export { fetchTask, createTask, deleteTask };