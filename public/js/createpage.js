let CuserName = "admin";
let CroomID = "0000";
let CgrpName = `ChatBox : ${CroomID}`;
let roomIDsec = document.getElementById("roomIDsec");


const socket = io();
socket.on('connect', () => {
    socket.emit("getRoomID");
})
socket.on("getRoomID", (roomId) => {
    console.log("Client : ", roomId);
    CroomID = roomId;
    roomIDsec.value = `Room ID : ${CroomID}`;
})

socket.on('disconnect', () => {
    socket.emit('seeuthen');
})

function createRoom() {
    CuserName = document.getElementById("getUserName").value;
    CgrpName = document.getElementById("getGrpName").value;

    if(CuserName) localStorage.setItem('uName', CuserName);
    else CuserName = 'Admin';
    if(CgrpName) localStorage.setItem('grpName', CgrpName);
    else CgrpName = `ChatBox : ${CroomID}`
    location.href = `/chat?rID=${CroomID}`;
}