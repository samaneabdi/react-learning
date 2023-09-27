import axios from "axios";
import { v4 as uuidv4 } from "uuid";

type Task ={
  id?:string,
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

const fetchTask = async () => {
  const response = await client.get('/');
  return response.data;
};

const createTask = async (newTaskData:Task) => {
    const response = await client.post("", newTaskData);
    return response;
};

const deleteTask = async (id:string) => {
  const response = await client.delete(id);
  return response.data;
};

export { fetchTask, createTask, deleteTask };