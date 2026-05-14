module.exports = (io) => {

    io.on("connection", (socket) => {

        console.log("Client connected");

        socket.on("join_user_room", (user_id) => {

            socket.join(user_id);

            console.log(`User joined room: ${user_id}`);
        });

        socket.on("disconnect", () => {

            console.log("Client disconnected");
        });
    });
};