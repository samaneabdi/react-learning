import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const apiKey = "Bearer c6669c72a45113aa347c235b8a49e3406011bcd1";
const client = axios.create({
  baseURL: "https://api.todoist.com/rest/v2/tasks",
  headers: {
    Authorization: apiKey,
    "X-Request-Id": uuidv4(),
    "Content-Type": "application/json",
  },
});

// let tasks = [];

const fetchTask = async () => {
  const response = await client.get();
  return response.data;
};

const createTask = async (newTaskData) => {
    const response = await client.post("", newTaskData);
    return response;
};

const deleteTask = async (id) => {
  const response = await client.delete(id);
  // tasks = tasks.filter((task) => task.id !== id);

  return response.data;
};

export { fetchTask, createTask, deleteTask };
