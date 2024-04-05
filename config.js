import fs from "fs-extra";
import { join } from "path";
import { homedir } from "os";
import { readFileSync } from "fs";

const { outputJSON } = fs;

export async function writeToLocalDb(config) {
  const path = await getConfigPath();
  return await outputJSON(path, config);
}

export async function readLocalDb() {
  const path = await getConfigPath();
  return await JSON.parse(readFileSync(path, "utf8"));
}

export async function getConfigPath() {
  const path = join(homedir(), ".config", "sparrow", "config.json");
  return path;
}
