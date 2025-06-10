const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Admin connected: ", socket.id);
});

app.post("/notify", (req, res) => {
  io.emit("new-notification", req.body); // generic notification
  res.send({ status: "Notification sent" });
});

server.listen(4000, () => {
  console.log("Socket.IO + Express server running on port 4000");
});