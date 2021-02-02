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

// let rooms = [
//     {
//         name: "rooomName",
//         users: [
//             {
//                 name: "userName",
//                 score: 0,
//
//             }
//         ]
//     }
// ];

let rooms;
io.on('connection', (socket) => {
    socket.on("joinRoom",room =>{
        rooms = room;
        socket.join(rooms);
        console.log(`ID room: ${rooms}`);
        console.log(`Connect user with ID: ${socket.id}`);
    });
    socket.on("mouse", data => {
        socket.to(rooms).broadcast.emit("mouse", data);
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
    //CHAT
    socket.on("sendMsg",({name,msg}) => {
        console.log(msg);
        io.to(rooms).emit("receiveMsg",{name,msg});
    });

});





http.listen(4000, () => {
    console.log('listening on *:4000');
});