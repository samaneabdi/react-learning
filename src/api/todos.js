import { v4 as uuidv4 } from "uuid";

const apiKey = "Bearer c6669c72a45113aa347c235b8a49e3406011bcd1";
const url = `https://api.todoist.com/rest/v2/tasks`;

let tasks = [];

const fetchTask = async () => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  });
  tasks = await response.json();
  return tasks;

};

const createTask = async (newTaskData) => {
  const response = await fetch(url, {
    method: "Post",
    headers: {
      Authorization: apiKey,
      "X-Request-Id": uuidv4(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTaskData),
  });

  let newTask = await response.json();
  tasks = [...tasks, newTask];
  return tasks;
};

const deleteTask = async (id) => {
  const response = await fetch(url + `/${id}`, {
    method: "Delete",
    headers: {
      Authorization: apiKey,
    },
  });

  return await response.json();
};

export { fetchTask, createTask, deleteTask };
