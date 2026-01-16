import { z } from "zod";

export function register(server, config) {
  const sides = config.dice.defaultSides;

  server.registerTool({
    name: "roll_d6",
    description: "Roll a 6-sided dice",
    inputSchema: z.object({}),
    handler: async () => {
      const roll = Math.floor(Math.random() * sides) + 1;
      return {
        content: [
          {
            type: "text",
            text: `🎲 You rolled a ${roll} (d${sides})`,
          },
        ],
      };
    },
  });
}
