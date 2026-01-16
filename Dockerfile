FROM node:20-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --production

COPY server.js config.js ./
COPY tools ./tools

ENV MCP_SERVER_NAME=utilities-mcp

ENTRYPOINT ["node", "server.js"]
