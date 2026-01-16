import { z } from "zod";

export function tool(config) {
  const sides = config.dice.defaultSides;

  return {
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
  };
}
