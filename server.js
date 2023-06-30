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
    console.log("New Socket Connection detected...");
    socket.on('message', (msgObj) => {
        // console.log(msgObj);
        socket.broadcast.emit("message", msgObj);
    })
})