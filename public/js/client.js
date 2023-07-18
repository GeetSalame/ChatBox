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

if (!username) username = localStorage.getItem("uName");
if (!grpName) grpName = localStorage.getItem("grpName");
if (params.get('rID')) roomId = params.get('rID');

console.log("1 : ", username, roomId);


//connecting to new room
socket.on('connect', () => {
    socket.emit('newRoom', roomId);
    // if (params.get('rID')) roomId = params.get('rID');
    // if (params.get('rID')) {
    //     roomId = params.get('rID');
    //     socket.emit('newRoom', roomId);
    // } else {
    //     socket.emit('getRoomID');
    // }
})

// socket.on("getRoomID", (availableRoom) => {
//     roomId = availableRoom;
// })

socket.on("members", (memberObj) => {
    displayMembers(memberObj);
    appendGrpName(grpName);
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