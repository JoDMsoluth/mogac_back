import * as express from "express";
const util = require("util");

interface ISocketUser {
  id: string;
  name: string;
  room: string;
}

const users = [];

const addUser = ({ id, name, room }: ISocketUser) => {
  const userName = name.trim().toLowerCase();
  const roomId = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === roomId && user.name === userName
  );

  if (!userName || !roomId) return { error: "Username and room are required." };
  if (existingUser) return { error: "Username is taken." };

  const user = { id, name: userName, room: roomId };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

export default async ({ app }: { app: express.Application }) => {
  const server = require("http").createServer(app);
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    socket.on("join", ({ name, room }, callback) => {
      console.log(name, room);
      if (name && room) {
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        socket.join(user.room);

        socket.emit("message", {
          user: "admin",
          text: `${user.name}, welcome to room ${user.room}.`,
        });
        console.log(user.room);
        socket.broadcast
          .to(user.room)
          .emit("message", { user: "admin", text: `${user.name} has joined!` });

        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
      }

      callback();
    });

    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);

      io.to(user.room).emit("message", { user: user.name, text: message });

      callback();
    });

    socket.on("disconnect", () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room).emit("message", {
          user: "Admin",
          text: `${user.name} has left.`,
        });
        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
      }
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
