const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const socketHandler = require("./sockets/socketHandler");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

socketHandler(io);

app.set("io", io);

app.use("/users", userRoutes);
app.use("/transactions", transactionRoutes);

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});