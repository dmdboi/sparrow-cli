const axios = require("axios");

const { readLocalDb } = require("./config");

async function main(arguments) {
  const config = await readLocalDb();

  const url = "https://sparrow.dmdboi.dev";
  const token = config.token;

  if (!url || !token) {
    console.log("Please create a config json with a URL and token.");
    return;
  }

  const api = axios.create({
    baseURL: `${url}/api`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const command = arguments[2];

  if (command === "add") {
    const task = arguments[3];
    const tag = arguments[4];

    const response = await api.post("/tasks", {
      name: task,
      tag: tag ? tag : "general",
    });

    if (response.status === 200) {
      console.log("Task created successfully!");
    } else {
      console.log("Failed to create task.");
    }
  }

  if (command === "list") {
    const page = arguments[3] || 0;
    const limit = arguments[4] || 10;

    const response = await api.get("/tasks", {
      params: {
        page,
        limit,
      },
    });

    if (response.status === 200) {
      const { tasks } = response.data;
      console.log("Tasks:");
      tasks.forEach(task => {
        console.log(`${new Date(task.created_at).toDateString()} - ${task.name} (${task.tag})`);
      });
    } else {
      console.log("Failed to fetch tasks.");
    }
  }
}

main(process.argv);
