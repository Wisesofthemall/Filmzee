import { Server } from "socket.io";

export default function SocketHandler(req: any, res: any) {
  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("send-message", (obj) => {
      io.emit("receive-message", obj);
    });
  });
  console.log("setting socket");
  res.end();
}
