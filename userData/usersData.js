var usersData = [
    {
        userId: "1",
        roomId: "",
        userName: ""
    },
    {
        userId: "2",
        roomId: "",
        userName: ""
    }
];

function addUser(userObj) {
    usersData.push(userObj);
}

function removeUser(id) {
    const index = usersData.findIndex(user => user.userId === id); //get the index of the matched Id
    if (index !== -1) {
        return usersData.splice(index, 1); //removing one element starting from index 1
    }
}

const getRoomId = (id) => {
    const index = usersData.findIndex(user => user.userId === id);
    return usersData[index].roomId;
}
const getUserName = (id) => {
    const index = usersData.findIndex(user => user.userId === id);
    return usersData[index].userName;
}

module.exports = { usersData, addUser, removeUser, getRoomId, getUserName };