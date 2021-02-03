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
                creator: socket.id, //id of room creator
                mode, // game mode
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
        socket.emit("createRoom");
        console.log(`Create room: ${room}`);
        console.log(`User with ID: ${socket.id} join to room`);
    });
    //joing user to the room
    socket.on("joinRoom",(data)=>{
        const {room,name} = data;
        if(rooms.find(el => el.name === room)) {
            const idx = rooms.findIndex(el => el.name === room);
            rooms[idx].userCount =  rooms[idx].userCount + 1;
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
    //start game from lobby
    socket.on("startGame",room => {
        //only creator can start game
        const findCreator = rooms.find(el => el.creator === socket.id);
        if((findCreator !== undefined) && (findCreator.creator === socket.id) && (findCreator.name === room)){
            console.log("znaleziono twórcę gra się rozpoczyna");
            //set status of game to start
            findCreator.start = true;
            //start game
            io.to(room).emit("startGame");
        }
    });
    //canvas
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
    //CHAT
    socket.on("sendMsg",({name,msg,room}) => {
        io.to(room).emit("receiveMsg",{name,msg});
    });
    socket.on('disconnect', () => {
        // const idx = users.findIndex(el => el.id === socket.id);
        // const roomIdx = rooms.findIndex(el => el.room === users[idx].name);
        // if(idx !== -1 && roomIdx !== -1) {
        //     //change counter of users in room
        //     rooms[roomIdx].userCount = rooms[roomIdx].userCount - 1;
        //     //delete user from array
        //     users.splice(idx, 1);
        // }
        console.log(rooms);
        console.log(users);
        console.log(`Disconnect user with ID: ${socket.id}`);
    });


});





http.listen(4000, () => {
    console.log('listening on :4000');
});