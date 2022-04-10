const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.id === userId)) {
    users.push({ id: userId, socketId });
  }
};
const removeUser = (socketId) => {
  console.log(socketId, "- user disconnected");
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log(socket.id, "- user connected");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
