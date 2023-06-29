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