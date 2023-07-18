const socket = io();

let username;
let roomId;
let memberlist = document.getElementById("memberlist");
let grpname = document.getElementById("grpname");
let msgsec = document.getElementById("msgsec");
let typemsg = document.getElementById("typemsg");

const url = window.location.search;
let params = new URLSearchParams(url);
username = localStorage.getItem("uName");
roomId = params.get('rID');
console.log("1 : ", username, roomId);

// do {
//     roomId = prompt("Enter Room Id");
//     if (roomId === null) {
//         location.href = '/';
//         break;
//     }
// } while (!roomId);
// if (roomId !== null) {
//     do {
//         username = prompt("Enter Username");
//     } while (!username);
// }

//connecting to new room
socket.on('connect', () => {
    socket.emit('newRoom', roomId);
})

socket.on("members", (memberObj) => {
    displayMembers(memberObj);
    appendGrpName();
})

socket.emit("newUser", username, roomId);

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