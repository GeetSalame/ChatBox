let JuserName = "guest";
let JroomID = "0000";
let RoomExistance;

const socket = io();
socket.on('connect', () => {
    // socket.emit("getRoomID");
})
socket.on("doesRoomExists", (response) => {
    RoomExistance = response;
})

socket.on('disconnect', () => {
    socket.emit('seeuthen');
})

function joinRoom(){
    JuserName = document.getElementById("getUserName").value;
    JroomID = document.getElementById("getRoomId").value;

    socket.emit("doesRoomExists", JroomID);

    // console.log("user joined : ", JuserName, JroomID);
    localStorage.setItem('uName', JuserName);

    if(RoomExistance) location.href = `/chat?rID=${JroomID}`;
    else {
        alert("Room doesn't exists");
    }
}