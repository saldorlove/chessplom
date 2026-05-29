import { io } from "socket.io-client";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

const SOCKET_URL = API_BASE_URL.replace(/\/api\/?$/, "");

export const friendSocket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ["websocket", "polling"],
});

export function ensureFriendSocketConnected() {
  if (!friendSocket.connected) {
    friendSocket.connect();
  }

  return friendSocket;
}