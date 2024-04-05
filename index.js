#!/usr/bin/env node
import axios from "axios";
import { readLocalDb } from "./config.js";
import chalk from "chalk";

async function main() {
  const config = await readLocalDb();

  const url = config.url;
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

  const command = process.argv[2];

  if (command === "add") {
    const task = process.argv[3];
    const tag = process.argv[4];

    const response = await api.post("/tasks", {
      name: task,
      tag: tag ? tag : "general",
    });

    if (response.status === 200) {
      console.log(`${chalk.green("[ Success ]")} Task created successfully.`);
    } else {
      console.log(`${chalk.red("[ Error ]")} Failed to create task.`);
    }
  }

  if (command === "list") {
    const page = process.argv[3] || 0;
    const limit = process.argv[4] || 10;

    const response = await api.get("/tasks", {
      params: {
        page,
        limit,
      },
    });

    if (response.status === 200) {
      const { tasks } = response.data;
      console.log();
      console.log(`${chalk.green("|------------------------|")}`);
      console.log("          Tasks         ");
      console.log(`${chalk.green("|------------------------|")}`);
      console.log();
      tasks.forEach(task => {
        console.log(`${chalk.green(`[${new Date(task.created_at).toDateString()}]`)} - ${task.name} (${task.tag})`);
      });
    } else {
      console.log("Failed to fetch tasks.");
    }
  }
}

main();
