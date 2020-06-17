import * as express from "express";
const util = require("util");

export default async ({ app }: { app: express.Application }) => {
  const server = require("http").createServer(app);
  const io = require("socket.io")(server);

  io.on("connection", (socket, opt) => {
    socket.on("message", ({ name, message }) => {
      io.emit("message", { name, message });
      util.log(name, message);
    });

    //     socket.on("join", (roomId, fn) => {
    //       socket.join(roomId, () => {
    //         util.log("Join", roomId, Object.keys(socket.rooms));
    //       });
    //     });

    //     socket.on("leve", (roomId, fn) => {
    //       socket.leave(roomId);
    //     });
    //     socket.on("message", (data, fn) => {
    //       util.log("messege>>", data.msg, Object.keys(socket.rooms));
    //     });

    //     socket.on("disconnecting", (data) => {
    //       util.log("disconnecting>>", socket.id);
    //     });
  });

  return server;
};
