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
    try {
        return usersData[index].roomId;
    } catch (error) {
        console.log(error);
    }
}

const getUserName = (id) => {
    const index = usersData.findIndex(user => user.userId === id);
    try {
        return usersData[index].userName;
    } catch (error) {
        console.log(error);
    }
    
    // if(usersData[index].userName) return usersData[index].userName;
    // else (console.log("Some error occured! at usersData[index].userName"));
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

const isRoomAvailable = (roomNumber) => {
    usersData.map(user => {
        if(user.roomId === roomNumber){
            return false;
        }
    });
    return true;
}

module.exports = { usersData, addUser, removeUser, getRoomId, getUserName, getAllUsers, isRoomAvailable };