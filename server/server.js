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
                users:[
                    {
                        id:socket.id,
                        room,
                        name,
                        score: 0
                    }
                ]
            }
        );
        socket.join(room);
        socket.emit("createRoom");
        console.log(`User with ID: ${socket.id} join to room`);
    });
    //joing user to the room
    socket.on("joinRoom",(data)=>{
        const {room,name} = data;
        const roomToJoin = rooms.find(el => el.name === room);
        if(roomToJoin){
            roomToJoin.userCount+=1;
            roomToJoin.users.push(
                {
                    id: socket.id,
                    name,
                    score: 0
                }
            );
            socket.join(room);
            console.log(`Joining user with ID: ${socket.id}`);
        }
    });
    //start game from lobby
    socket.on("startGame",room => {
        //only creator can start game
        const findCreator = rooms.find(el => el.creator === socket.id);
        if((findCreator !== undefined) && (findCreator.creator === socket.id) && (findCreator.name === room)){
            findCreator.start = true; //set status of game to start
            io.to(room).emit("startGame"); //start game
        }
    });
    //canvas
    socket.on("mouse", data => {
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
    //DISCONNECT
    socket.on('disconnect', () => {
        for(let i=0; i<rooms.length; i++){
            const findIdx = rooms[i].users.findIndex(el => el.id === socket.id);//searching id of client
            if(findIdx !== -1){
                rooms[i].userCount-=1;//reduce numbers of users
                rooms[i].users.splice(findIdx,1); //delete client from room
                break;
            }
        }
        console.log(`Disconnect user with ID: ${socket.id}`);
    });


});





http.listen(4000, () => {
    console.log('listening on :4000');
});