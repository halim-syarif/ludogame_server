function getRoomId(lastRoom){
    if(!lastRoom){
        return 'room-001-'+ new Date().getMilliseconds()
    } else {
        let roomNumber = Number(lastRoom.split('-')[1]) + 1
        if(roomNumber < 10) roomNumber = '00' + roomNumber
        else if(roomNumber < 100) roomNumber = '0' + roomNumber
        return 'room-' + roomNumber + '-' + new Date().getMilliseconds()
    }
}

const checkTurnOrder = () => {
    const turn_oder = [
        { group: 'red', rank: 0 },
        { group: 'green', rank: 0 },
        { group: 'yellow', rank: 0 },
        { group: 'blue', rank: 0 },
    ];

    let newTurnOrder = []

    let randomOrder = Math.floor(Math.random() * 4)
    
    for (let i = 0; i < turn_oder.length; i++){
        if (randomOrder === 4) {
            randomOrder = 0
        }
        newTurnOrder.push(turn_oder[randomOrder])
        randomOrder++
    }

    return newTurnOrder

}



module.exports = {
    getRoomId,
    checkTurnOrder
}