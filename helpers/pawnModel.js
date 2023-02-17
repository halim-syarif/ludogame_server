
// const checkPath = (color) => {
//     switch (color) {
//         case 'red': 
//             return [19, 20, 21, 22, 23, 15, 12, 9, 6, 3, 0, 1, 2, 5, 8, 11, 14, 17, 24, 25, 26, 27, 28, 29, 41, 53, 52, 51, 50, 49, 48, 56, 59, 62, 65, 68, 71, 70, 69, 66, 63, 60, 57, 54, 47, 46, 45, 44, 43, 42, 30, 31, 32, 33, 34, 35, 'win']
//         case 'green':
//             return [5, 8, 11, 14, 17, 24, 25, 26, 27, 28, 29, 41, 53, 52, 51, 50, 49, 48, 56, 59, 62, 65, 68, 71, 70, 69, 66, 63, 60, 57, 54, 47, 46, 45, 44, 43, 42, 30, 18, 19, 20, 21, 22, 23, 15, 12, 9, 6, 3, 0, 1, 4, 7, 10, 13, 16, 'win']
//         case 'blue':
//             return [66, 63, 60, 57, 54, 47, 46, 45, 44, 43, 42, 30, 18, 19, 20, 21, 22, 23, 15, 12, 9, 6, 3, 0, 1, 2, 5, 8, 11, 14, 17, 24, 25, 26, 27, 28, 29, 41, 53, 52, 51, 50, 49, 48, 56, 59, 62, 65, 68, 71, 70, 67, 64, 61, 58, 55, 'win']
//         case 'yellow':
//             return [52, 51, 50, 49, 48, 56, 59, 62, 65, 68, 71, 70, 69, 66, 63, 60, 57, 54, 47, 46, 45, 44, 43, 42, 30, 18, 19, 20, 21, 22, 23, 15, 12, 9, 6, 3, 0, 1, 2, 5, 8, 11, 14, 17, 24, 25, 26, 27, 28, 29, 41, 40, 39, 38, 37, 36, 'win']
//     }
// }

class PawnModel {
    constructor (color, num) {
        this.name = `${color}_player_${num}`
        this.color = `${color}`
        this.player = `<div class="player bg-${color} move${color}${num}" id="${color}_player_${num}"></div>`
        this.current_position = 0
        this.status = 'home'
        this.current_step = null
        this.previous_step = null
        this.home = `.${color}-home`
        this.controller = `#move${color}${num}`
        // this.path = checkPath(color)

    }
}

function createPawns (color) {
    const pawns = []
    for (let i = 1; i <= 4; i++){
        pawns.push(new PawnModel(color, i))
    }
    return pawns
}

module.exports = {
    createPawns
}

