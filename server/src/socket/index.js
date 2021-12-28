const socketIo = (io) => {
  io.on("connection", async (socket) => {
    console.log("socket connection established");
    // join room
    const { roomId } = socket.handshake.query;
    socket.join(roomId);

    // listen new notifications from user to admin
    socket.on("newNotif", (data) => {
      io.in("adminNotif").emit("newNotif", data.body);
    });

    // listen new notifications from admin to user
    socket.on("newUserNotif", (data) => {
      const trxId = data.body.id;
      io.in(trxId).emit("newNotif", data.body);
    });

    // leave the room
    socket.on("disconnect", () => {
      socket.leave(roomId);
    });
  });
};

module.exports = socketIo;
