const socket = io();

let username;
let msgsec = document.getElementById("msgsec");
let typemsg = document.getElementById("typemsg");
let roomId;


do {
    roomId = prompt("Enter Room Id");
} while (!roomId);
do {
    username = prompt("Enter Username");
} while (!username);

socket.on('connect', () => {
    socket.emit('newRoom', roomId);
})

socket.emit("newUser", username, roomId);

typemsg.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        sendMessage(e.target.value);
    }
})

function returnTime(date) {
    var hour = date.getHours();
    var min = date.getMinutes();
    var strTime = `${hour}:${min}`
    return strTime;
}

function sendMessage(msg) {
    let msgObj = {
        roomId: roomId,
        name: username,
        message: msg,
        time: returnTime(new Date)
    }

    appendMsg(msgObj, "omsgsec");
    socket.emit('message', msgObj);
    typemsg.value = '';
    typemsg.focus();
}

function appendMsg(msgObj, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className);

    let markup = `
    <h4>${msgObj.name}</h4>
    <div class="msg">
    <p>${msgObj.message}</p>
    <span>${msgObj.time}</span>
    </div>
    `;

    mainDiv.innerHTML = markup;
    msgsec.appendChild(mainDiv);
    scrollToBottom();
}

function appendUsername(username) {
    let mainDiv = document.createElement('div');
    mainDiv.classList.add("entry");

    let markup = `
    <p>${username} joined</p>
    `;

    mainDiv.innerHTML = markup;
    msgsec.appendChild(mainDiv);
    scrollToBottom();
}

function appendUserLeft(username) {
    let mainDiv = document.createElement('div');
    mainDiv.classList.add("entry");

    let markup = `
    <p>${username} disconnected</p>
    `;

    mainDiv.innerHTML = markup;
    msgsec.appendChild(mainDiv);
    scrollToBottom();
}

// receive msg
socket.on("message", (msgObj) => {
    appendMsg(msgObj, "imsgsec");
})

//add new user notification
socket.on("newUser", (username) => {
    appendUsername(username);
})

//add user left notification
socket.on("userLeft", (username) => {
    console.log("Userleft msg on client");
    appendUserLeft(username);
})

//add that you are leaving
socket.on('disconnect', () => {
    appendUserLeft(username);
    socket.emit('disconnect', { username, roomId });
})

function scrollToBottom() {
    msgsec.scrollTop = msgsec.scrollHeight;
}