import { v4 as uuidv4 } from "uuid";

const apiKey = "Bearer c6669c72a45113aa347c235b8a49e3406011bcd1";
const url = `https://api.todoist.com/rest/v2/tasks`;

type NewTask = {
  id?: string,
  content: string,
  description: string,
  is_completed: boolean
}

const fetchTask = async () => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: apiKey,
    },
  });

  return await response.json() as Promise<NewTask[]>;
};

const createTask = async (newTaskData : NewTask) => {
  const response = await fetch(url, {
    method: "Post",
    headers: {
      Authorization: apiKey,
      "X-Request-Id": uuidv4(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTaskData),
  });

  return await response.json();
};

const deleteTask = async (id: string) => {
  const response = await fetch(url + `/${id}`, {
    method: "Delete",
    headers: {
      Authorization: apiKey,
    },
  });

  return await response.json();
};

export { fetchTask, createTask, deleteTask };
