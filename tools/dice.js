import { z } from "zod";

export function register(server, config) {
  const sides = config.dice.defaultSides;

  server.tool(
    "roll_d6",
    "Roll a 6-sided dice",
    z.object({}),
    async () => {
      const roll = Math.floor(Math.random() * sides) + 1;
      return {
        content: [
          {
            type: "text",
            text: `🎲 You rolled a ${roll} (d${sides})`,
          },
        ],
      };
    }
  );
}
