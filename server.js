const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);

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

//socket
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log("New Socket Connection detected...", socket.id);

    // listening to "message" signal name
    socket.on('message', (msgObj) => {
        // when the server listens "message" signal name (it can be from any client) it gets the data (here msgObj) with the signal and brodcasts this msgObj with signal name "message" (which is same signal name as of clients, i kept it same u can keep anything else. you have to just check same signal name that u have kept in client side while listening to it ). this broadcasted msg then can be heard by every client that is connected on this network and they also get the data.
        socket.broadcast.emit("message", msgObj);
    })

    socket.on('newUser', (username) => {
        socket.broadcast.emit("newUser", username);
    })

    socket.on('disconnect', (username) => {
        socket.broadcast.emit("userLeft", username);
        console.log("userleft msg on server :", username);
    })
})
