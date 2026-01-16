#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create MCP server
const server = new Server(
  {
    name: config.serverName,
    version: config.serverVersion,
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Auto-load tools
const toolsDir = path.join(__dirname, "tools");
const toolFiles = fs.readdirSync(toolsDir).filter(f => f.endsWith(".js"));

for (const file of toolFiles) {
  const modulePath = path.join(toolsDir, file);
  const module = await import(modulePath);

  if (typeof module.register === "function") {
    module.register(server, config);
    console.log(`✔ Loaded utility: ${file}`);
  } else {
    console.warn(`⚠ Skipped ${file} (no register() export)`);
  }
}

// Start MCP transport
const transport = new StdioServerTransport();
await server.connect(transport);
