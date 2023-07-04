import { httpServer } from "./src/http_server";
import { webSocketServer } from "./src/websocket_server";

const HTTP_PORT = 3000;

webSocketServer.options.server = httpServer;
console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);