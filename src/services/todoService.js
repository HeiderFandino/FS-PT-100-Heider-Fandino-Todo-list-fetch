const baseUrl = "https://playground.4geeks.com/todo";

const username = "heiderfandino123";
const userUrl = `${baseUrl}/users/${username}`;
const todosUrl = `${baseUrl}/todos/${username}`;

export const todoService = {
  getTasks: async () => {
    const resp = await fetch(userUrl);
    if (!resp.ok) throw resp;
    const data = await resp.json();
    return data.todos || [];
  },

  createUser: async () => {
    const resp = await fetch(userUrl, {
      method: "POST",
      body: JSON.stringify([]), 
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) throw resp;
  },

  addTask: async (task) => {
    const resp = await fetch(todosUrl, {
      method: "POST",
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
    });
    if (!resp.ok) throw resp;
  },

  deleteTask: async (taskId) => {
    const resp = await fetch(`${baseUrl}/todos/${taskId}`, { method: "DELETE" });
    if (!resp.ok) throw resp;
  },

  clearAllTasks: async () => {
    const resp = await fetch(userUrl, { method: "DELETE" });
    if (!resp.ok) throw resp;
  },
};
