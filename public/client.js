const socket = io();

let username = document.getElementById("getUserName").value;
let memberlist = document.getElementById("memberlist");
let msgsec = document.getElementById("msgsec");
let typemsg = document.getElementById("typemsg");
let grpname = document.getElementById("grpname");

let roomId = Math.floor(100000 + Math.random() * 900000);
document.getElementById("assignRoomId").value = "Room ID : " + roomId;

function createRoom(){
    location.href = `/chat?roomID=${roomId}`;
}

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

function appendGrpName() {
    let mainDiv = document.createElement('SPAN');

    let markup = `Room : ${roomId}`;
    mainDiv.innerHTML = markup;
    grpname.replaceChild(mainDiv, grpname.childNodes[0]);
}


function refreshMemberList() {
    socket.emit("members", roomId);
    //display group members
    socket.on("members", (memberObj) => {
        displayMembers(memberObj);
    })
}

socket.emit("newUser", username, roomId);

typemsg.addEventListener('keyup', (e) => {
    if (typemsg.value === '\n' || typemsg.value === '') {
        alert("You have not entered any message")
        typemsg.value = '';
    }
    else {
        if (e.key === "Enter") {
            sendMessage(e.target.value);
            console.log("This is msg :", e.target);
        }
    }
})
function sendClicked() {
    let msg = typemsg.value;
    if (typemsg.value === '\n' || typemsg.value === '') {
        alert("You have not entered any message")
        typemsg.value = '';
    }
    else { sendMessage(msg); }
}

function returnTime(date) {
    var hour = date.getHours();
    var min = date.getMinutes();
    var checkHour = hour;
    var checkMin = min;
    if (checkHour < 10) { hour = '0' + checkHour; }
    if (checkMin < 10) { min = '0' + checkMin; }
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

function displayMembers(memberObj) {
    // let mainDiv = document.createElement('LI');
    // mainDiv.classList.add(`user_${username}`);

    let markup = '';
    memberObj.map(member => {
        markup = markup.concat(`<li>${member}</li>`);
    })
    console.log(",members : ", markup)
    // markup = `
    // <li>${username}</li>
    // `;

    // mainDiv.innerHTML = markup;
    // memberlist.appendChild(markup);
    memberlist.innerHTML = markup;
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

const linksec = document.getElementById("roomlink");
linksec.value = window.location.href;

function copyLink() {
    // Get the text field
    var copyText = document.getElementById("roomlink");

    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);

    // Alert the copied text
    // alert("Linked copied : " + copyText.value);
    document.getElementById("copy").style.display = "none";
    document.getElementById("copied").style.display = "block";

}