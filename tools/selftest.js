import { z } from "zod";

export function tool() {
  return {
    name: "self_test",
    description: "Basic health check tool that returns OK",
    inputSchema: z.object({}),
    handler: async () => ({
      content: [
        { type: "text", text: "✅ MCP server is alive and responding!" }
      ]
    })
  };
}
