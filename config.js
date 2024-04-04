const fs = require("fs-extra");
const { join } = require("path");
const { homedir } = require("os");
const { readFileSync } = require("fs");

const { readJSON, outputJSON } = fs;

async function writeToLocalDb(config) {
  const path = await getConfigPath();
  return await outputJSON(path, config);
}

async function readLocalDb() {
  const path = await getConfigPath();
  return await JSON.parse(readFileSync(path, "utf8"));
}

async function getConfigPath() {
  const path = join(homedir(), ".config", "sparrow", "config.json");
  return path;
}

module.exports = {
  writeToLocalDb,
  readLocalDb,
};
