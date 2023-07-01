const socket = io();
let username;
let msgsec = document.getElementById("msgsec");
let typemsg = document.getElementById("typemsg");


do {
    username = prompt("Enter Username");
} while (!username);

socket.emit("newUser", username);

typemsg.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        sendMessage(e.target.value);
    }
})

function sendMessage(msg) {
    let msgObj = {
        name: username,
        message: msg
    }

    appendMsg(msgObj, "omsgsec");
    socket.emit('message', msgObj);
    typemsg.value = '';
}

function appendMsg(msgObj, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className);

    let markup = `
    <h4>${msgObj.name}</h4>
    <p>${msgObj.message}</p>
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
    <p>${username} left</p>
    `;

    mainDiv.innerHTML = markup;
    msgsec.appendChild(mainDiv);
    scrollToBottom();
}

// receive msg
socket.on("message", (msgObj) => {
    appendMsg(msgObj, "imsgsec");
})
socket.on("newUser", (username) => {
    appendUsername(username);
})
socket.on("userLeft", (username) => {
    console.log("Userleft msg on client");
    appendUserLeft(username);
})

socket.on('disconnect', (username) => {
    socket.emit('disconnect', username);
})

function scrollToBottom() {
    msgsec.scrollTop = msgsec.scrollHeight;
}