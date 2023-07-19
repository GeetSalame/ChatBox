const socket = io();
localStorage.setItem("isCreateMode", false);

let username, grpName;
let roomId;
let memberlist = document.getElementById("memberlist");
let grpname = document.getElementById("grpname");
let msgsec = document.getElementById("msgsec");
let typemsg = document.getElementById("typemsg");

const url = window.location.search;
let params = new URLSearchParams(url);

if (!username && localStorage.getItem("uName")) username = localStorage.getItem("uName");
else username = prompt("Enter Username");

if (params.get('rID')) roomId = params.get('rID');

if (!grpName && localStorage.getItem("grpName")) grpName = localStorage.getItem("grpName");
else grpName = `ChatBox : ${roomId}`;

console.log("1 : ", username, roomId);


//connecting to new room
socket.on('connect', () => {
    socket.emit('newRoom', roomId);
})


// socket.on("getRoomID", (availableRoom) => {
//     roomId = availableRoom;
// })

socket.on("members", (memberObj) => {
    displayMembers(memberObj);
    appendGrpName(grpName);
})

socket.emit("newUser", username, roomId, grpName);

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
    // socket.emit('disconnect', { username, roomId });
})