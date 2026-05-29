import type { Server as HttpServer } from "node:http";
import { Server } from "socket.io";
export declare function setupSocketServer({ httpServer, clientOrigin, }: {
    httpServer: HttpServer;
    clientOrigin: string;
}): Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
//# sourceMappingURL=socket.d.ts.map