function displayMembers(memberObj) {
    document.getElementById("displayRoomID").innerHTML = `Room ID : <span style="color: var(--theme-pri);">${roomId}</span>`;
    let markup = '';
    memberObj.map(member => {
        markup = markup.concat(`<li>${member}</li>`);
    })

    memberlist.innerHTML = markup;
}

function appendGrpName(grpName) {
    let mainDiv = document.createElement('SPAN');

    let markup = `${grpName}`;
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

typemsg.addEventListener('keyup', (e) => {
    if (typemsg.value === '\n' || typemsg.value === '') {
        console.log("You have not entered any message");
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