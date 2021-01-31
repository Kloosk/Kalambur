const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const cors = require('cors');

//Cors
app.use(cors());

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on("mouse", data => {
        socket.broadcast.emit("mouse", data);
    });
    socket.on("finishDraw", () => {
        socket.broadcast.emit("finishDraw");
    });
    socket.on("startDraw", data => {
        socket.broadcast.emit("startDraw", data);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

http.listen(4000, () => {
    console.log('listening on *:4000');
});