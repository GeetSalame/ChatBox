var usersData = [];

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

const getAllUsers = (id) => {
    let allUsers = [];
    usersData.map(user => {
        if(user.roomId === id){
            allUsers.push(user.userName);
        }
    });
    return allUsers;
}

module.exports = { usersData, addUser, removeUser, getRoomId, getUserName, getAllUsers };