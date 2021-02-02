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

const rooms = [];
const users = [];

app.get("/api/roomexist",(req,res) => {
    const headerRoom = req.headers.room;
    const find = rooms.find(el => el.name === headerRoom);
    if(!find){
        return res.json({room: false});
    }
    return res.json({room: true,start:find.start});

});


io.on('connection', (socket) => {
    //creating room and user is join
    socket.on("createRoom",(data)=>{
        const {mode,room, name,rounds,time} = data;
        rooms.push(
            {
                name: room, //name of room
                start: false, //status of game
                rounds, //rounds to play
                time, //time on drawing
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
    socket.on("joinRoom",(data)=>{
        const {room,name} = data;
        if(rooms.find(el => el.name === room)) {
            const idx = rooms.findIndex(el => el.name === room);
            rooms[idx].userCount =  rooms[idx].userCount++;
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
        }else{
           console.log("Room doesnt exist");
        }
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
    socket.on("sendMsg",({name,msg,room}) => {
        console.log(msg);
        io.to(room).emit("receiveMsg",{name,msg});
    });

});





http.listen(4000, () => {
    console.log('listening on :4000');
});