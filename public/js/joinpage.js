let JuserName = "guest";
let JroomID = "0000";

function joinRoom(){
    JuserName = document.getElementById("getUserName").value;
    JroomID = document.getElementById("getRoomId").value;
    console.log("user joined : ", JuserName, JroomID);
    localStorage.setItem('uName', JuserName);
    location.href = `/chat?rID=${JroomID}`;
}