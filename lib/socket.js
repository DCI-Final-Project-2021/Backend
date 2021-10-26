import { Server } from 'socket.io';

export const io = new Server(process.env.SOCKET_PORT, {cors: {origin: "*"}});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on('cart', (order) => {
    console.log("server socket on cart");
    socket.broadcast.emit("cart", order);
  });
})


