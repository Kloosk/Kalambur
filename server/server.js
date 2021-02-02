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
//                 id: socket.id,
//                 name: "userName",
//                 score: 0,
//
//             }
//         ]
//     }
// ];

const rooms = [];
const users = [];
io.on('connection', (socket) => {
    //creating room and user is join
    socket.on("createRoom",({room,name,time,rounds})=>{
        rooms.push(
            {
                name: room,
                rounds,
                time,
                roundCount:0,//round counting
                userCount:1, // user counting
            }
        );
        users.push(
            {
                id:socket.id,
                room,
                name,
                score: 0
            }
        );
        console.log(rooms);
        console.log(users);
        socket.join(room);
        console.log(`Create room: ${room}`);
        console.log(`User with ID: ${socket.id} join to room`);
    });
    //joing user to the room
    socket.on("joinRoom",({room,name})=>{
        //if(rooms.find(el => el.name === room)) {
            //const idx = rooms.findIndex(el => el.name === room);
            //rooms[idx].userCount =  rooms[idx].userCount++;
            users.push(
                {
                    id: socket.id,
                    room,
                    name,
                    score: 0
                }
            );
            socket.join(room);
            console.log(`ID room: ${room}`);
            console.log(`Joining user with ID: ${socket.id}`);
        //}else{
          //  console.log("Room doesnt exist");
        //}
    });

    socket.on("mouse", data => {
        console.log(data.room);
        socket.to(data.room).broadcast.emit("mouse", data);
    });
    socket.on("finishDraw", data => {
        socket.to(data.room).broadcast.emit("finishDraw");
    });
    socket.on("startDraw", data => {
        socket.to(data.room).broadcast.emit("startDraw", data);
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