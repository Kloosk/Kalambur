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

let players = [];
let rooms;

io.on('connection', (socket) => {
    //joining to the room
    socket.on("joinRoom",room =>{
        rooms = room;
        socket.join(`${rooms}`);
        console.log(`ID of room: ${rooms}`);
        console.log(`Connect user with ID: ${socket.id}`);
    });
    socket.on("mouse", data => {
        console.log("chuj kurwa")
        socket.to(rooms).emit("mouse", data);
    });
    socket.on("finishDraw", () => {
        socket.to(rooms).broadcast.emit("finishDraw");
    });
    socket.on("startDraw", data => {
        socket.to(rooms).broadcast.emit("startDraw", data);
    });
    socket.on('disconnect', () => {
        console.log(`Disconnect user with ID: ${socket.id}`);
    });
});





http.listen(4000, () => {
    console.log('listening on *:4000');
});