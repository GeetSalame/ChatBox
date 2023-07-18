let CuserName = "admin";
let CroomID = "0000";
let CgrpName;

function createRoom() {
    CuserName = document.getElementById("getUserName").value;
    CgrpName = document.getElementById("getGrpName").value;

    CroomID = Math.floor(Math.random()*10000);
    // to check if the room ID is available

    CgrpName = `ChatBox ${CroomID}`;
    localStorage.setItem('uName', CuserName);
    location.href = `/chat?rID=${CroomID}`;
}