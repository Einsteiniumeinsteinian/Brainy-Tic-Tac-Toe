var squareBoxes = document.getElementsByTagName("td")
var text = document.querySelector("h1")
var col_1 = document.querySelectorAll(".col-1")
var col_2 = document.querySelectorAll(".col-2")
var col_3 = document.querySelectorAll(".col-3")
var row_1 = document.querySelectorAll(".row-1")
var row_2 = document.querySelectorAll(".row-2")
var row_3 = document.querySelectorAll(".row-3")
var player1 = "X"
var player1Array = []
var player2 = "O"
var player2Array = []
var player2Turn = false;
var vsComputer = true
var won = false
var poppedOut = false
var randomNumber;
var removeRandomNumber;
var InputTimer;
var EjectTimer
var lastIndex;
var boxes = [
    [0, 2, null],
    [null, null, null],
    [0, null, null]
]


for (let i = 0; i < squareBoxes.length; i++) {
    squareBoxes[i].addEventListener("click", function () {


        // switch (key) {
        //     case col_1  col_2:

        //         break;

        //     default:
        //         break;
        // }


        // alert("hurray")
        if (squareBoxes[i].textContent === "") {
            playerTurn(i)

            if (winningCondition(col_1)) {
                winner(col_1)
            }
            else if (winningCondition(col_2)) {
                winner(col_2)
            }
            else if (winningCondition(col_3)) {
                winner(col_3)
            }
            else if (winningCondition(row_1)) {
                console.log("i")
                winner(row_1)
            }
            else if (winningCondition(row_2)) {
                console.log("i")
                winner(row_2)
            }
            else if (winningCondition(row_3)) {
                console.log("i")
                winner(row_3)
            }
            // else {
            //     // playerTurn(i)
            // }
        }
        else {
            if (player1Array.length === 3 && player2Array.length === 3) {
                if (!poppedOut) {
                    if (squareBoxes[i].textContent === player1 && squareBoxes[i] !== squareBoxes[4]) {

                        player1Array.pop()
                        console.log("player1Array at removed: " + player1Array)
                        text.textContent = "Player One's Turn"
                        player2Turn = false
                        poppedOut = true
                        squareBoxes[i].textContent = ""
                        if(vsComputer){
                            boxIndex(i, 3)
                            boxes[listIndex][elementIndex] = null
                        }
                    }
                    else if (squareBoxes[i].textContent === player2 && squareBoxes[i] !== squareBoxes[4]) {
                        if (!vsComputer) {
                            player2Array.pop()
                            console.log("player2Array at removed: " + player2Array)
                            text.textContent = "Player Two's Turn"
                            player2Turn = true
                            poppedOut = true
                            squareBoxes[i].textContent = ""
                        }
                    }
                }
            }
        }
    })
}

function winningCondition(col) {
    return col[0].textContent === col[1].textContent && col[0].textContent === col[2].textContent && col[0].textContent === player1 || col[0].textContent === col[1].textContent && col[0].textContent === col[2].textContent && col[0].textContent === player2
}

function winner(position) {
    if (position[0].textContent === player1) {
        text.textContent = "Player One Wins"
        if (vsComputer) {
            clearTimeout(InputTimer)
            clearTimeout(EjectTimer)
        }
    }
    else {
        text.textContent = "Player Two Wins"
    }
    won = true
}

function playerTurn(i) {
    if (!won) {
        if (!player2Turn) {
            if (player1Array.length < 3) {
                squareBoxes[i].textContent = player1
                player1Array.push(player1)
                console.log("player1Array @ add: " + player1Array)
                if (vsComputer) {
                    boxIndex(i, 3)
                    boxes[listIndex][elementIndex] = player1
                    console.log(boxes)
                    text.textContent = "Computer Is Playing...."
                }
                else {
                    text.textContent = "Player Two's Turn"
                }
                poppedOut = false
                player2Turn = true

                if (player2Array.length === 3 && vsComputer) {
                    EjectTimer = setTimeout(function () {
                        randomEjector()
                        player2Array.pop()
                        console.log(boxes)
                        console.log("player2Array at removed: " + player2Array)
                        text.textContent = "Computer Is Playing...."
                        player2Turn = true
                        poppedOut = true
                        squareBoxes[removeRandomNumber].textContent = ""
                        boxIndex(removeRandomNumber, 3)
                        boxes[listIndex][elementIndex] = null

                    }, 2500)
                }
            }
            // computer(i)
            if (vsComputer) {
                InputTimer = setTimeout(function () {
                    if (player2Array.length < 3) {
                        randomPicker(i)
                        squareBoxes[randomNumber].textContent = player2
                        player2Array.push(player2)
                        text.textContent = "Player One's Turn"
                        poppedOut = false;
                        player2Turn = false
                        boxIndex(randomNumber, 3)
                        boxes[listIndex][elementIndex] = player2
                        console.log(boxes)
                    }
                }, 2500)

                // }
            }
        }
        else if (!vsComputer) {
            if (player2Array.length < 3) {
                squareBoxes[i].textContent = player2
                player2Array.push(player2)
                text.textContent = "Player One's Turn"
                poppedOut = false
                player2Turn = false
            }
        }
        // player2Turn = !player2Turn
    }
}
function randomPicker(i) {
    randomNumber = Math.floor(Math.random() * squareBoxes.length)

    while ((squareBoxes[i].textContent === player1 && squareBoxes[i].textContent === squareBoxes[randomNumber].textContent) || (squareBoxes[randomNumber].textContent === player2) && (removeRandomNumber = randomNumber)) {
        randomNumber = Math.floor(Math.random() * squareBoxes.length)
    }

}
function randomEjector() {
    removeRandomNumber = Math.floor(Math.random() * squareBoxes.length)
    while (squareBoxes[removeRandomNumber].textContent !== player2 || squareBoxes[4] === squareBoxes[removeRandomNumber]) {
        removeRandomNumber = Math.floor(Math.random() * squareBoxes.length)
    }
}
function computer(i) {
    if (player2Array.length < 3) {
        randomPicker(i)
        squareBoxes[randomNumber].textContent = player2
        player2Array.push(player2)
        text.textContent = "Player One's Turn"
        poppedOut = false
    }
}


function boxIndex(squareBoxesIndex, divisor) {
    listIndex = Math.floor(squareBoxesIndex / divisor)
    elementIndex = squareBoxesIndex % divisor
    return [listIndex, elementIndex]
}

// function compBoxIndex(randomIndex, divisor){
// compListIndex = Math.floor(randomIndex / divisor)
// CompElementIndex = randomIndex % divisor
// }
// function compBoxIndex(i, divisor) {
//     listIndex = Math.floor(i / divisor)
//     elementIndex = i % divisor
//     return [listIndex, elementIndex]
// }
// function winner(){
//     if(squareBoxes[1].textContent === squareBoxes[0].textContent === squareBoxes[2].textContent){
//         alert("Winner")
//     }
// }

// Version 2
var squareBoxes = document.getElementsByTagName("td")
var text = document.querySelector("h1")
var col_1 = document.querySelectorAll(".col-1")
var col_2 = document.querySelectorAll(".col-2")
var col_3 = document.querySelectorAll(".col-3")
var row_1 = document.querySelectorAll(".row-1")
var row_2 = document.querySelectorAll(".row-2")
var row_3 = document.querySelectorAll(".row-3")
var player1 = "X"
var player1Array = []
var player2 = "O"
var player2Array = []
var player2Turn = false;
var vsComputer = false
var won = false
var poppedOut = false
var randomNumber;
var boxNumber;
var removeRandomNumber;
var InputTimer;
var EjectTimer



for (let i = 0; i < squareBoxes.length; i++) {
    squareBoxes[i].addEventListener("click", function () {


        // alert("hurray")
        if (squareBoxes[i].textContent === "") {
            playerTurn(i)
            WinFunction()
            // else {
            //     // playerTurn(i)
            // }
        }
        else {
            if (player1Array.length === 3 && player2Array.length === 3) {
                if (!poppedOut) {
                    if (squareBoxes[i].textContent === player1 && squareBoxes[i] !== squareBoxes[4]) {

                        player1Array.pop()
                        console.log("player1Array at removed: " + player1Array)
                        text.textContent = "Player One's Turn"
                        player2Turn = false
                        poppedOut = true
                        squareBoxes[i].textContent = ""

                    }
                    else if (squareBoxes[i].textContent === player2 && squareBoxes[i] !== squareBoxes[4]) {
                        if (!vsComputer) {
                            player2Array.pop()
                            console.log("player2Array at removed: " + player2Array)
                            text.textContent = "Player Two's Turn"
                            player2Turn = true
                            poppedOut = true
                            squareBoxes[i].textContent = ""
                        }
                    }
                }
            }
        }
    })
}

function WinFunction() {
    if (winningCondition(col_1)) {
        console.log("Win Condition Ran")
        winner(col_1)
    }
    else if (winningCondition(col_2)) {
        console.log("Win Condition Ran")

        winner(col_2)
    }
    else if (winningCondition(col_3)) {
        console.log("Win Condition Ran")

        winner(col_3)
    }
    else if (winningCondition(row_1)) {
        console.log("Win Condition Ran")

        winner(row_1)
    }
    else if (winningCondition(row_2)) {
        console.log("Win Condition Ran")

        winner(row_2)
    }
    else if (winningCondition(row_3)) {
        console.log("Win Condition Ran")

        winner(row_3)
    }
}

function winningCondition(col) {
    return col[0].textContent === col[1].textContent && col[0].textContent === col[2].textContent && col[0].textContent === player1
        || col[0].textContent === col[1].textContent && col[0].textContent === col[2].textContent && col[0].textContent === player2
}

function winner(position) {
    if (position[0].textContent === player1) {
        text.textContent = "Player One Wins"
        if (vsComputer) {
            clearTimeout(InputTimer)
            clearTimeout(EjectTimer)
        }
    }
    else {
        if (vsComputer) {
            text.textContent === "Computer Wins"
            clearTimeout(InputTimer)
            clearTimeout(EjectTimer)
        }
        else {
            text.textContent = "Player Two Wins"
        }
    }
    won = true
}

function playerTurn(i) {
    if (!won) {
        if (!player2Turn) {
            if (player1Array.length < 3) {
                squareBoxes[i].textContent = player1
                player1Array.push(player1)
                console.log("player1Array @ add: " + player1Array)
                if (vsComputer) {
                    text.textContent = "Computer Is Playing...."
                }
                else {
                    text.textContent = "Player Two's Turn"
                }
                poppedOut = false
                player2Turn = true

                if (player2Array.length === 3 && vsComputer) {
                    console.log("random ejector")
                    EjectTimer = setTimeout(function () {
                        randomEjector()
                        player2Array.pop()
                        // console.log(boxes)
                        console.log("player2Array at removed: " + player2Array)
                        text.textContent = "Computer Is Playing...."
                        player2Turn = true
                        poppedOut = true
                        squareBoxes[removeRandomNumber].textContent = ""
                        // boxIndex(removeRandomNumber, 3)
                        // boxes[listIndex][elementIndex] = null

                    }, 2500)
                }
            }
            // computer(i)
            if (vsComputer) {
                InputTimer = setTimeout(function () {
                    if (player2Array.length < 3) {
                        // gameChecker(i)
                        // computerDefensePlay(i)
                        // randomPicker(i)
                        // squareBoxes[randomNumber].textContent = player2
                        comp_logic(i)
                        player2Array.push(player2)
                        text.textContent = "Player One's Turn"
                        poppedOut = false;
                        player2Turn = false

                        // boxIndex(boxNumber, 3)
                        // boxes[listIndex][elementIndex] = player2
                        // console.log(boxes)
                    }
                }, 2500)

                // }
            }
        }
        else if (!vsComputer) {
            if (player2Array.length < 3) {
                squareBoxes[i].textContent = player2
                player2Array.push(player2)
                text.textContent = "Player One's Turn"
                poppedOut = false
                player2Turn = false
            }
        }
        // player2Turn = !player2Turn
    }
}
function randomPicker(inputs) {
    randomNumber = Math.floor(Math.random() * squareBoxes.length)

    while ((squareBoxes[inputs].textContent === player1 && squareBoxes[inputs].textContent === squareBoxes[randomNumber].textContent) || (squareBoxes[randomNumber].textContent === player2) && (removeRandomNumber = randomNumber)) {
        randomNumber = Math.floor(Math.random() * squareBoxes.length)
    }

}
function randomEjector() {
    removeRandomNumber = Math.floor(Math.random() * squareBoxes.length)
    // console.log("test = "+ test )
    while (squareBoxes[removeRandomNumber].textContent !== player2 || squareBoxes[4] === squareBoxes[removeRandomNumber] || checkColumnAndRow() === true) {
        removeRandomNumber = Math.floor(Math.random() * squareBoxes.length)

    }
}
function computer(i) {
    if (player2Array.length < 3) {
        randomPicker(i)
        squareBoxes[randomNumber].textContent = player2
        player2Array.push(player2)
        text.textContent = "Player One's Turn"
        poppedOut = false
    }
}

function checkColumnAndRow() {
    let compPosition = computerPlayChecker(player2)
    if (compPosition.includes(true)) {

        if (compPosition.indexOf(true) < 3) {
            const startIndex = compPosition.indexOf(true) * 3
            const endIndex = startIndex + 2
            return smartRemove(startIndex, endIndex)
        }
        else {
            console.log("B")
            const startIndex = compPosition.indexOf(true) - 3
            const endIndex = startIndex + 6
            return smartRemove(startIndex, endIndex)
        }

    }

}

function smartRemove(start_value, end_value, a) {
    var positn = [start_value, start_value + 1, end_value]
    return positn.includes(removeRandomNumber)
}

function computerPlayChecker(player, value) {
    // Check Row
    let check_row_1 = squareBoxes[0].textContent === player && squareBoxes[1].textContent === player && squareBoxes[2].textContent === ""
        || squareBoxes[0].textContent === player && squareBoxes[2].textContent === player && squareBoxes[1].textContent === ""
        || squareBoxes[1].textContent === player && squareBoxes[2].textContent === player && squareBoxes[0].textContent === ""
    let check_row_2 = squareBoxes[3].textContent === player && squareBoxes[4].textContent === player && squareBoxes[5].textContent === ""
        || squareBoxes[3].textContent === player && squareBoxes[5].textContent === player && squareBoxes[4].textContent === ""
        || squareBoxes[4].textContent === player && squareBoxes[5].textContent === player && squareBoxes[3].textContent === ""
    let check_row_3 = squareBoxes[6].textContent === player && squareBoxes[7].textContent === player && squareBoxes[8].textContent === ""
        || squareBoxes[6].textContent === player && squareBoxes[8].textContent === player && squareBoxes[7].textContent === ""
        || squareBoxes[7].textContent === player && squareBoxes[8].textContent === player && squareBoxes[6].textContent === ""
    // Check Column
    let check_col_1 = squareBoxes[0].textContent === player && squareBoxes[3].textContent === player && squareBoxes[6].textContent === ""
        || squareBoxes[0].textContent === player && squareBoxes[6].textContent === player && squareBoxes[3].textContent === ""
        || squareBoxes[3].textContent === player && squareBoxes[6].textContent === player && squareBoxes[0].textContent === ""
    let check_col_2 = squareBoxes[1].textContent === player && squareBoxes[4].textContent === player && squareBoxes[7].textContent === ""
        || squareBoxes[1].textContent === player && squareBoxes[7].textContent === player && squareBoxes[4].textContent === ""
        || squareBoxes[4].textContent === player && squareBoxes[7].textContent === player && squareBoxes[1].textContent === ""
    let check_col_3 = squareBoxes[2].textContent === player && squareBoxes[5].textContent === player && squareBoxes[8].textContent === ""
        || squareBoxes[2].textContent === player && squareBoxes[8].textContent === player && squareBoxes[5].textContent === ""
        || squareBoxes[5].textContent === player && squareBoxes[8].textContent === player && squareBoxes[2].textContent === ""
    return [check_row_1, check_row_2, check_row_3, check_col_1, check_col_2, check_col_3]
}
function computerGameplay(start_value, end_value, a) {
    for (let b = start_value; b < end_value; b = b + a) {
        console.log(b)
        if (squareBoxes[b].textContent === "") {
            console.log("ran")
            squareBoxes[b].textContent = player2
        }


    }
}

function comp_logic(inDex) {
    // let playerPosition = computerPlayChecker(player2)
    // const [row_a, row_b, row_c, col_a, col_b, col_c] = computerPlayChecker(player1)
    let playerPosition = computerPlayChecker(player1)
    let compPosition = computerPlayChecker(player2)

    // for (let x = 0, y = 0; x < 3, y < 7; x = x + 1, y = y + 3) {
    //         let a = y + 3
    //         //  true false false......... or false true false......... or false false true..... or false false false
    //         if (playerPosition[x]) {
    //             computerGameplay(y, a, 1)
    //             console.log(playerPosition[x], x, y, a)
    //             return
    //         }
    //         else if(playerPosition[0] === false && playerPosition[1] === false && playerPosition[2] === false ){
    //             randomPicker(inDex)
    //             console.log(playerPosition[x], x, y, a)
    //             console.log("else ran @ " + playerPosition[x ])
    //             squareBoxes[randomNumber].textContent = player2
    //             return
    //         }
    // }


    if (compPosition.includes(true)) {
        if (compPosition.indexOf(true) < 3) {
            const startIndex = compPosition.indexOf(true) * 3
            const endIndex = startIndex + 3
            computerGameplay(startIndex, endIndex, 1)
        }
        else {
            const startIndex = compPosition.indexOf(true) - 3
            const endIndex = startIndex + 7
            computerGameplay(startIndex, endIndex, 3)
        }
    }
    else if (playerPosition.includes(true)) {
        if (playerPosition.indexOf(true) < 3) {
            const startIndex = playerPosition.indexOf(true) * 3
            const endIndex = startIndex + 3
            computerGameplay(startIndex, endIndex, 1)

        }
        else {
            const startIndex = playerPosition.indexOf(true) - 3
            const endIndex = startIndex + 7
            computerGameplay(startIndex, endIndex, 3)
        }
    }
    else {
        randomPicker(inDex)
        squareBoxes[randomNumber].textContent = player2
    }
    WinFunction()
}






// function computerDefensePlay(inDex) {
//     for (let k = 0; k < 2; k++) {
//         for (let j = 1; j < 3; j++) {
//             if (k !== j) {
//                 console.log(k, j)
//                 // console.log("j" + j + boxes[listIndex][j], "k" + k + boxes[listIndex][k])
//                 console.log("row" + boxes[j][elementIndex] + "=" + boxes[k][elementIndex], "col " + boxes[listIndex][j] + "=" + boxes[listIndex][k] )
//                 // console.log("@2 " + "j" + j + boxes[j][elementIndex], "k" + k + boxes[k][elementIndex])

//                 if ((boxes[listIndex][j] === null && boxes[listIndex][k] === null)){
//                     randomPicker(inDex)
//                     console.log("@null" + randomNumber)
//                     // console.log("j" + j + boxes[listIndex][j], "k" + k + boxes[listIndex][k])
//                     squareBoxes[randomNumber].textContent = player2
//                     boxNumber = randomNumber
//                 }

//                 else if ((boxes[listIndex][j] === player1) && (boxes[listIndex][k] === player1)) {
//                     let null_Column_Index = boxes[listIndex].indexOf(null)
//                     console.log(null_Column_Index)
//                     squareBoxes[null_Column_Index].textContent = player2
//                     boxNumber = null_Column_Index
//                 }
//                 else if ((boxes[listIndex][j] === player1 && boxes[listIndex][k] === player2) || (boxes[listIndex][j] === player2 && boxes[listIndex][k] === player1)) {
//                     randomPicker(inDex)
//                     console.log('third condition successful')
//                     squareBoxes[randomNumber].textContent = player2
//                     boxNumber = randomNumber
//                 }
//             }
//         }
//     }

// }

// A function that can compare two or more numbers a b & c

// for(let k = 0; k < 2; k++){
//     for(j = 1; j<3; j++)
//     if(k !== j){
//         console.log("j" + j, "k"+ k)
//         if( boxes[listIndex][j] && boxes[listIndex][k] === player1){
// console.log("worked")
//     }   
// }

// function compBoxIndex(randomIndex, divisor){
// compListIndex = Math.floor(randomIndex / divisor)
// CompElementIndex = randomIndex % divisor
// }
// function compBoxIndex(i, divisor) {
//     listIndex = Math.floor(i / divisor)
//     elementIndex = i % divisor
//     return [listIndex, elementIndex]
// }
// function winner(){
//     if(squareBoxes[1].textContent === squareBoxes[0].textContent === squareBoxes[2].textContent){
//         alert("Winner")
//     }
// }

