#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { config } from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load tools from ./tools
 * Each tool must export:
 *   export function tool(config) { return { name, description, inputSchema, handler } }
 */
const tools = [];

const toolsDir = path.join(__dirname, "tools");
const toolFiles = fs.readdirSync(toolsDir).filter(f => f.endsWith(".js"));

for (const file of toolFiles) {
  const modulePath = path.join(toolsDir, file);

  // ✅ ESM-safe dynamic import
  const moduleUrl = pathToFileURL(modulePath).href;
  const module = await import(moduleUrl);

  if (typeof module.tool === "function") {
    const toolDef = module.tool(config);

    if (!toolDef?.name || !toolDef?.handler) {
      console.warn(`⚠ Skipped ${file} (invalid tool definition)`);
      continue;
    }

    tools.push(toolDef);
    console.log(`✔ Loaded utility: ${toolDef.name}`);
  } else {
    console.warn(`⚠ Skipped ${file} (no tool() export)`);
  }
}

const server = new Server(
  {
    name: config.serverName,
    version: config.serverVersion,
  },
  {
    tools
  }
);

// Connect MCP transport (stdio)
const transport = new StdioServerTransport();
await server.connect(transport);
