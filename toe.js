var squareBoxes = document.getElementsByTagName("td")
var text = document.querySelector("h1")
var col_1 = document.querySelectorAll(".col-1")
var col_2 = document.querySelectorAll(".col-2")
var col_3 = document.querySelectorAll(".col-3")
var row_1 = document.querySelectorAll(".row-1")
var row_2 = document.querySelectorAll(".row-2")
var row_3 = document.querySelectorAll(".row-3")
var diag_1 = document.querySelectorAll(".diagonal-1")
var diag_2 = document.querySelectorAll(".diagonal-2")
var allLines = [col_1, col_2, col_3, row_1, row_2, row_3, diag_1, diag_2]
var continueBtn = document.getElementById("Continue")
var scoreKeeper = document.querySelectorAll(".scorekeeper")
var player1ScoreKeeper = 0
var player2ScoreKeeper = 0
var compScoreKeeper = 0
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



for (let i = 0; i < squareBoxes.length; i++) {
    squareBoxes[i].addEventListener("click", function () {
        if (squareBoxes[i].textContent === "") {
            playerTurn(i)
            winFunction()
        }
        else {
            if (!won) {
                if (player1Array.length === 3 && player2Array.length === 3) {
                    if (!poppedOut) {
                        if (squareBoxes[i].textContent === player1 && squareBoxes[i] !== squareBoxes[4]) {

                            player1Array.pop()
                            text.textContent = "Player One's Turn"
                            player2Turn = false
                            poppedOut = true
                            squareBoxes[i].textContent = ""

                        }
                        else if (squareBoxes[i].textContent === player2 && squareBoxes[i] !== squareBoxes[4]) {
                            if (!vsComputer) {
                                player2Array.pop()
                                text.textContent = "Player Two's Turn"
                                player2Turn = true
                                poppedOut = true
                                squareBoxes[i].textContent = ""
                            }
                        }
                    }
                }
            }
        }
    })
}


continueBtn.addEventListener("click", function () {
    reset()
    if (!player2Turn) {
        text.textContent = "Player One's Turn"
    }
    else {
        if (vsComputer) {
            text.textContent = "Computer Is Playing...."
            if (vsComputer) {
                InputTimer = setTimeout(function () {
                    if (player2Array.length < 3) {
                        randomNumber = Math.floor(Math.random() * squareBoxes.length)
                        squareBoxes[randomNumber].textContent = player2

                        player2Array.push(player2)
                        text.textContent = "Player One's Turn"
                        poppedOut = false;
                        player2Turn = false
                        winFunction()
                    }
                }, 2500)

            }

        }
        else {
            text.textContent = "Player Two's Turn"
        }
    }
})

function winFunction() {
    for (let w = 0; w < allLines.length; w++) {
        if (winningCondition(allLines[w])) {
            winner(allLines[w])
        }
    }
}

function winningCondition(boxgroup) {
    return boxgroup[0].textContent === boxgroup[1].textContent && boxgroup[0].textContent === boxgroup[2].textContent && boxgroup[0].textContent === player1
        || boxgroup[0].textContent === boxgroup[1].textContent && boxgroup[0].textContent === boxgroup[2].textContent && boxgroup[0].textContent === player2
}

function winner(position) {
    if (position[0].textContent === player1) {
        text.textContent = "Player One Wins"
        player1ScoreKeeper++
        scoreKeeper[0].textContent = player1ScoreKeeper
        if (vsComputer) {
            clearTimeout(InputTimer)
            clearTimeout(EjectTimer)
        }
    }
    else {
        if (vsComputer) {
            text.textContent = "Computer Wins"
            compScoreKeeper++
            scoreKeeper[2].textContent = compScoreKeeper
            clearTimeout(InputTimer)
            clearTimeout(EjectTimer)
        }
        else {
            text.textContent = "Player Two Wins"
            player2ScoreKeeper++
            scoreKeeper[1].textContent = player2ScoreKeeper

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
                if (vsComputer) {
                    text.textContent = "Computer Is Playing...."
                }
                else {
                    text.textContent = "Player Two's Turn"
                }
                poppedOut = false
                // player2Turn = true

                if (player2Array.length === 3 && vsComputer) {
                    EjectTimer = setTimeout(function () {
                        randomEjector()
                        player2Array.pop()
                        text.textContent = "Computer Is Playing...."
                        poppedOut = true
                        squareBoxes[removeRandomNumber].textContent = ""

                    }, 2500)
                }
            }
            // computer Playing
            if (vsComputer) {
                InputTimer = setTimeout(function () {
                    if (player2Array.length < 3) {
                        comp_logic(i)
                        player2Array.push(player2)
                        text.textContent = "Player One's Turn"
                        poppedOut = false;
                        player2Turn = false
                        winFunction()
                    }
                }, 2500)

            }
        }
        else if (!vsComputer) {
            if (player2Array.length < 3) {
                squareBoxes[i].textContent = player2
                player2Array.push(player2)
                text.textContent = "Player One's Turn"
                poppedOut = false
                // player2Turn = false
            }
        }
        player2Turn = !player2Turn
    }
}



function randomPicker(inputs) {
    randomNumber = Math.floor(Math.random() * squareBoxes.length)
    randomNumber = 5

    // while ((squareBoxes[inputs].textContent === player1 && squareBoxes[inputs].textContent === squareBoxes[randomNumber].textContent) 
    // || (squareBoxes[randomNumber].textContent === player2) && (removeRandomNumber === randomNumber)) {
    //     randomNumber = Math.floor(Math.random() * squareBoxes.length)
    // }

    while (squareBoxes[randomNumber].textContent === player1
        || squareBoxes[randomNumber].textContent === player2
        || removeRandomNumber === randomNumber) {
        randomNumber = Math.floor(Math.random() * squareBoxes.length)
    }
}
function randomEjector() {
    // if (checkForDoubleWinPosition) {
    //     console.log("mad oo")
    //     // console.log("mad oo", loopstopper)
    //     // break;

    // }
    // else {
    //     removeRandomNumber = Math.floor(Math.random() * squareBoxes.length)

    //     while (squareBoxes[removeRandomNumber].textContent !== player2 || squareBoxes[4] === squareBoxes[removeRandomNumber] || checkColumnAndRow()) {
    //         // if (checkForDoubleWinPosition) {
    //         //     console.log("mad oo")
    //         //     // console.log("mad oo", loopstopper)
    //         //     break;

    //         // }
    //         // else {
    //         //     removeRandomNumber = Math.floor(Math.random() * squareBoxes.length)
    //         //     console.log("else ran")
    //         // }
    //         removeRandomNumber = Math.floor(Math.random() * squareBoxes.length)

    //     }
    // }
    removeRandomNumber = Math.floor(Math.random() * squareBoxes.length)

    while (squareBoxes[removeRandomNumber].textContent !== player2 || squareBoxes[4] === squareBoxes[removeRandomNumber] || checkColumnAndRow()) {
        // if (checkForDoubleWinPosition) {
        //     console.log("mad oo")
        //     // console.log("mad oo", loopstopper)
        //     break;

        // }
        // else {
        //     removeRandomNumber = Math.floor(Math.random() * squareBoxes.length)
        //     console.log("else ran")
        // }
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

// if number to be removed !== player two or if  =  to mid box randomize

function checkForDoubleWinPosition() {
    // compPosition has 2 trues inside the array [false,false,true,true,false, false] [1,2,3,4,4,7,8].... solved with array filter

    let compPosition = computerPlayChecker(player2, "")
    var filterValue = compPosition.filter(function (val) {
        return val === true
    })

    //  check if array.filter contains more than one value.  use array.length 
    product()


    var product = function () {


        let NumberOfTruthValue = filterValue > 1
        return NumberOfTruthValue
    }
    // return true & false

}


function checkColumnAndRow() {
    let compPosition = computerPlayChecker(player2, "")
    let playerPosition = computerPlayChecker(player1, player2)
    if (compPosition.includes(true)) {
        console.log("TA-cCAR @ cp" + compPosition)
        if (compPosition.lastIndexOf(true) === 6) {
            const startIndex = compPosition.lastIndexOf(true) - 6
            const endIndex = startIndex + 8
            return smartRemove(startIndex, endIndex, 4)
        }
        // diagonal 0 
        else if (compPosition.lastIndexOf(true) === 7) {
            const startIndex = compPosition.lastIndexOf(true) - 5
            const endIndex = startIndex + 4
            return smartRemove(startIndex, endIndex, 2)

        }
        // rowa
        else if (compPosition.indexOf(true) < 3) {
            const startIndex = compPosition.indexOf(true) * 3
            const endIndex = startIndex + 2
            return smartRemove(startIndex, endIndex, 1)
        }
        // colums
        else if (compPosition.indexOf(true) < 6) {
            const startIndex = compPosition.indexOf(true) - 3
            const endIndex = startIndex + 6
            return smartRemove(startIndex, endIndex, 3)
        }


    }
    else if (playerPosition.includes(true)) {
        console.log("TA-cCAR @ pp")
        if (playerPosition.indexOf(true) < 3) {
            const startIndex = playerPosition.indexOf(true) * 3
            const endIndex = startIndex + 2
            return smartRemove(startIndex, endIndex, 1)
        }
        else if (playerPosition.indexOf(true) < 6) {
            const startIndex = playerPosition.indexOf(true) - 3
            const endIndex = startIndex + 6
            return smartRemove(startIndex, endIndex, 3)
        }
        else if (playerPosition.indexOf(true) === 6) {
            const startIndex = playerPosition.indexOf(true) - 6
            const endIndex = startIndex + 8
            return smartRemove(startIndex, endIndex, 4)
        }
        else if (playerPosition.indexOf(true) === 7) {
            const startIndex = playerPosition.indexOf(true) - 5
            const endIndex = startIndex + 4
            return smartRemove(startIndex, endIndex, 2)
        }
    }

}

function smartRemove(start_value, end_value, a) {
    const midIndex = start_value + a

    // for(let num = 0; num = squareBoxes.length; num++ ){
    //     cons
    // }
    var positn = [start_value, start_value + a, end_value]
    return positn.includes(removeRandomNumber)
}

function computerPlayChecker(player, value) {
    // Check Row
    let check_row_1 = squareBoxes[0].textContent === player && squareBoxes[1].textContent === player && squareBoxes[2].textContent === value
        || squareBoxes[0].textContent === player && squareBoxes[2].textContent === player && squareBoxes[1].textContent === value
        || squareBoxes[1].textContent === player && squareBoxes[2].textContent === player && squareBoxes[0].textContent === value
    let check_row_2 = squareBoxes[3].textContent === player && squareBoxes[4].textContent === player && squareBoxes[5].textContent === value
        || squareBoxes[3].textContent === player && squareBoxes[5].textContent === player && squareBoxes[4].textContent === value
        || squareBoxes[4].textContent === player && squareBoxes[5].textContent === player && squareBoxes[3].textContent === value
    let check_row_3 = squareBoxes[6].textContent === player && squareBoxes[7].textContent === player && squareBoxes[8].textContent === value
        || squareBoxes[6].textContent === player && squareBoxes[8].textContent === player && squareBoxes[7].textContent === value
        || squareBoxes[7].textContent === player && squareBoxes[8].textContent === player && squareBoxes[6].textContent === value
    // Check Column
    let check_col_1 = squareBoxes[0].textContent === player && squareBoxes[3].textContent === player && squareBoxes[6].textContent === value
        || squareBoxes[0].textContent === player && squareBoxes[6].textContent === player && squareBoxes[3].textContent === value
        || squareBoxes[3].textContent === player && squareBoxes[6].textContent === player && squareBoxes[0].textContent === value
    let check_col_2 = squareBoxes[1].textContent === player && squareBoxes[4].textContent === player && squareBoxes[7].textContent === value
        || squareBoxes[1].textContent === player && squareBoxes[7].textContent === player && squareBoxes[4].textContent === value
        || squareBoxes[4].textContent === player && squareBoxes[7].textContent === player && squareBoxes[1].textContent === value
    let check_col_3 = squareBoxes[2].textContent === player && squareBoxes[5].textContent === player && squareBoxes[8].textContent === value
        || squareBoxes[2].textContent === player && squareBoxes[8].textContent === player && squareBoxes[5].textContent === value
        || squareBoxes[5].textContent === player && squareBoxes[8].textContent === player && squareBoxes[2].textContent === value

    // check Diagonal
    let check_diag_1 = squareBoxes[0].textContent === player && squareBoxes[4].textContent === player && squareBoxes[8].textContent === value
        || squareBoxes[0].textContent === player && squareBoxes[8].textContent === player && squareBoxes[4].textContent === value
        || squareBoxes[4].textContent === player && squareBoxes[8].textContent === player && squareBoxes[0].textContent === value

    let check_diag_2 = squareBoxes[2].textContent === player && squareBoxes[4].textContent === player && squareBoxes[6].textContent === value
        || squareBoxes[2].textContent === player && squareBoxes[6].textContent === player && squareBoxes[4].textContent === value
        || squareBoxes[4].textContent === player && squareBoxes[6].textContent === player && squareBoxes[2].textContent === value

    return [check_row_1, check_row_2, check_row_3, check_col_1, check_col_2, check_col_3, check_diag_1, check_diag_2]
}
function blockPlayer1(start_value, end_value, a) {
    for (let b = start_value; b <= end_value; b = b + a) {
        console.log("b")
        if (squareBoxes[b].textContent === "") {
            squareBoxes[b].textContent = player2
        }


    }
}

function comp_logic(inDex) {
    let playerPosition = computerPlayChecker(player1, "")
    let compPosition = computerPlayChecker(player2, "")

    // for (let x = 0, y = 0; x < 3, y < 7; x = x + 1, y = y + 3) {
    //         let a = y + 3
    //         //  true false false......... or false true false......... or false false true..... or false false false
    //         if (playerPosition[x]) {
    //             blockPlayer1(y, a, 1)
    //             return
    //         }
    //         else if(playerPosition[0] === false && playerPosition[1] === false && playerPosition[2] === false ){
    //             randomPicker(inDex)
    //             squareBoxes[randomNumber].textContent = player2
    //             return
    //         }
    // }


    if (compPosition.includes(true)) {
        console.log("TA-c_L @ cp", compPosition)
        if (compPosition.lastIndexOf(true) === 6) {
            const startIndex = compPosition.lastIndexOf(true) - 6
            const endIndex = startIndex + 8
            console.log("cp @ 6")
            blockPlayer1(startIndex, endIndex, 4)
        }
        else if (compPosition.lastIndexOf(true) === 7) {
            const startIndex = compPosition.lastIndexOf(true) - 5
            const endIndex = startIndex + 4
            blockPlayer1(startIndex, endIndex, 2)
        }
        else if (compPosition.indexOf(true) < 3) {
            const startIndex = compPosition.indexOf(true) * 3
            const endIndex = startIndex + 2
            blockPlayer1(startIndex, endIndex, 1)
        }
        else if (compPosition.indexOf(true) < 6) {
            const startIndex = compPosition.indexOf(true) - 3
            const endIndex = startIndex + 6
            blockPlayer1(startIndex, endIndex, 3)
        }

    }
    else if (playerPosition.includes(true)) {
        console.log("TA-c_L @ pp")
        if (playerPosition.indexOf(true) < 3) {
            const startIndex = playerPosition.indexOf(true) * 3
            const endIndex = startIndex + 2
            blockPlayer1(startIndex, endIndex, 1)
        }
        else if (playerPosition.indexOf(true) < 6) {
            const startIndex = playerPosition.indexOf(true) - 3
            const endIndex = startIndex + 6
            blockPlayer1(startIndex, endIndex, 3)
        }
        else if (playerPosition.indexOf(true) === 6) {
            const startIndex = playerPosition.indexOf(true) - 6
            const endIndex = startIndex + 8
            console.log("playerPosition at diag 6", startIndex, endIndex)

            blockPlayer1(startIndex, endIndex, 4)
        }
        else if (playerPosition.indexOf(true) === 7) {
            const startIndex = playerPosition.indexOf(true) - 5
            const endIndex = startIndex + 4
            blockPlayer1(startIndex, endIndex, 2)
        }

    }
    else {
        randomPicker(inDex)
        squareBoxes[randomNumber].textContent = player2
    }
}

function reset() {
    for (let r = 0; r < squareBoxes.length; r++) {
        squareBoxes[r].textContent = ""
    }
    player1Array = []
    player2Array = []
    won = false
    poppedOut = false
    randomNumber;
    removeRandomNumber;
    InputTimer;
    EjectTimer
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

