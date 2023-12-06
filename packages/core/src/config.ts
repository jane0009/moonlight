import { Config } from "@moonlight-mod/types";
import requireImport from "./util/import";
import { getConfigPath } from "./util/data";

const defaultConfig: Config = {
  extensions: {},
  repositories: ["https://moonlight-mod.github.io/extensions/repo.json"]
};

export function writeConfig(config: Config) {
  const fs = requireImport("fs");
  const configPath = getConfigPath();
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

function readConfigNode(): Config {
  const fs = requireImport("fs");
  const configPath = getConfigPath();

  if (!fs.existsSync(configPath)) {
    writeConfig(defaultConfig);
    return defaultConfig;
  }

  let config: Config = JSON.parse(fs.readFileSync(configPath, "utf8"));

  // Assign the default values if they don't exist (newly added)
  config = { ...defaultConfig, ...config };
  writeConfig(config);

  return config;
}

export function readConfig(): Config {
  {
    return moonlightNode.config;
  }

  {
    return readConfigNode();
  }

  {
    return readConfigNode();
  }

  throw new Error("Called readConfig() in an impossible environment");
}
