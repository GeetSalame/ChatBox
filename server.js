const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);

const { usersData, addUser, removeUser, getRoomId, getUserName, getAllUsers, isRoomAvailable } = require('./userData/usersData');
let isCreateMode = false;

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})

//middleware
app.use(express.static(path.join(__dirname, '/public')));

// route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})
app.get('/create', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/create.html'));
})
app.get('/join', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/join.html'));
})
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/chatpage.html'));
})
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/pages/about.html'));
})

//socket
const io = require('socket.io')(http);

io.sockets.on('connection', (socket) => {
    console.log("New Socket Connection detected...", socket.id);

    // join new room
    socket.on('newRoom', (roomId) => {
        socket.join(roomId);
        io.to(socket.id).emit("members", getAllUsers(roomId));
    })

    socket.on("getRoomID", () => {
        do {
            availableRoom = Math.floor(Math.random() * 10000);
        } while (!isRoomAvailable(availableRoom));
        console.log("Server : ", availableRoom);
        io.to(socket.id).emit("getRoomID", availableRoom);
        // socket.join(availableRoom);
        // io.to(socket.id).emit("members", getAllUsers(availableRoom));
    })
    
    socket.on("doesRoomExists", (roomNumber) => {
        // let RoomExistance = isRoomAvailable(roomNumber);
        io.to(socket.id).emit("doesRoomExists", isRoomAvailable(roomNumber));
    })

    // listening to "message" signal name
    socket.on('message', (msgObj) => {
        // when the server listens "message" signal name (it can be from any client) it gets the data (here msgObj) with the signal and brodcasts this msgObj with signal name "message" (which is same signal name as of clients, i kept it same u can keep anything else. you have to just check same signal name that u have kept in client side while listening to it ). this broadcasted msg then can be heard by every client that is connected on this network and they also get the data.
        socket.to(msgObj.roomId).emit("message", msgObj);
    })

    socket.on('members', (roomId) => {
        io.to(socket.id).emit("members", getAllUsers(roomId));
    })

    socket.on('newUser', (username, roomid) => {
        addUser({ userId: socket.id, roomId: roomid, userName: username });
        console.log(usersData);
        socket.to(roomid).emit("newUser", username);
        socket.to(roomid).emit("members", getAllUsers(roomid));
    })

    socket.on('disconnect', () => {
            const username = getUserName(socket.id);
            const roomId = getRoomId(socket.id);
            socket.to(roomId).emit("userLeft", username);
            removeUser(socket.id);
            console.log("userleft msg on server :", socket.id);
            console.log(usersData);
            socket.to(roomId).emit("members", getAllUsers(roomId));
    })
})
