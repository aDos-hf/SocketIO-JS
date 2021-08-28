// EVENT CHANNEL

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const port = 3000;

//CONSTANTS
const EVENT_CHANNEL_DEVICE_CONNECTED = "connection";

const SOCKET_MESSAGE_TYPE = {
  CHAT_MESSAGE: "chat message",
};

io.on(EVENT_CHANNEL_DEVICE_CONNECTED, (socket) => {
  socket.on(SOCKET_MESSAGE_TYPE.CHAT_MESSAGE, (msg) => {
    io.emit(SOCKET_MESSAGE_TYPE.CHAT_MESSAGE, msg);
  });
});

server.listen(port, () => console.log("server running on port:" + port));
