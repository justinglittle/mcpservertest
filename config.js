export const config = {
  serverName: process.env.MCP_SERVER_NAME || "utilities-mcp",
  serverVersion: process.env.MCP_SERVER_VERSION || "1.0.0",

  dice: {
    defaultSides: Number(process.env.DICE_DEFAULT_SIDES || 6),
  },
};
