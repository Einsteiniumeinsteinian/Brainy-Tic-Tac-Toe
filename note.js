
var lastIndex;

boxes[0].[0]  0
boxes[listIndex].[elementIndex]
boxes[0].[1]  1

// lastIndex = i;
if()

  listIndex, elementIndex = fuckyou(loopIndex, 3)

  // Column

  `
    1. Column duplicate
    Find out last placed boxes/position
boxIndex(i,  3)
boxes[lastIndex][elementIndex]















    2. Row duplicate
    Find out last placed boxes/position
boxIndex(i,  3)
boxes[lastIndex][elementIndex]
 ... check for null 










    var row = "row"
  var rows =  boxes[lastIndex][k] = row + (k+1)
    boxes[k][elementIndex] = "col" + (k+1)
    if((row player1 && ) 
}



 }
















    3. Diagonal duplicate if that index is capable of making a diagonal
        If it is at the ends or at the middle.

    Check for null value;
    If null values are greater than 1 > skip
    Else: Store null index

    If there is a duplicate; If duplicate number is of computer;
      Mutate the Array @ that null index
    Else if there is a duplicate; type is player 1
      Mutate the Array @ that null index
    Else:
      Skip
  `

wr = []


boxes[0].[2]  2

boxes[1].[0]  3
boxes[1].[1]  4
boxes[1].[2]  5

boxes[2].[0]  6
boxes[2].[1]  7
boxes[2].[2]  8

function fuckyou(i,divisor){
    let listIndex = Math.floor(i/divisor)
    let elementIndex = i%divisor
    return [listIndex, elementIndex]
}

boxxes = [
    [0, 2,null],
    [null,null,null],
    [0,null,null]
]
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
var boxNumber;
var removeRandomNumber;
var InputTimer;
var EjectTimer
var boxes = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]


for (let i = 0; i < squareBoxes.length; i++) {
    squareBoxes[i].addEventListener("click", function () {


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
                        if (vsComputer) {
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
        if (vsComputer) {
            clearTimeout(InputTimer)
            clearTimeout(EjectTimer)
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

                    console.log("i =" + i)
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

// 
// function gameChecker(inDex) {
//     if (inDex % 3 === 0) {
//         if (squareBoxes[inDex] === squareBoxes[inDex + 1] || squareBoxes[inDex] === squareBoxes[inDex + 2]) {
//             if (squareBoxes[inDex + 1].textContent === "") {
//                 squareBoxes[inDex + 1].textContent = player2
//             }
//             else {
//                 squareBoxes[inDex + 2].textContent = player2
//             }
//         }
//         else {
//             console.log("random")
//             randomPicker(inDex)
//             squareBoxes[randomNumber].textContent = player2
//         }
//     }
// }

function computerPlayChecker(player) {
    // Check Row
    let check_row_1 = squareBoxes[0].textContent === player && squareBoxes[1].textContent === player || squareBoxes[0].textContent === player && squareBoxes[2].textContent === player || squareBoxes[1].textContent === player && squareBoxes[2].textContent === player
    let check_row_2 = squareBoxes[3].textContent === player && squareBoxes[4].textContent === player || squareBoxes[3].textContent === player && squareBoxes[5].textContent === player || squareBoxes[4].textContent === player && squareBoxes[5].textContent === player
    let check_row_3 = squareBoxes[6].textContent === player && squareBoxes[7].textContent === player || squareBoxes[6].textContent === player && squareBoxes[8].textContent === player || squareBoxes[7].textContent === player && squareBoxes[8].textContent === player
    // Check Column
    let check_col_1 = squareBoxes[0].textContent === player && squareBoxes[3].textContent === player || squareBoxes[0].textContent === player && squareBoxes[6].textContent === player || squareBoxes[3].textContent === player && squareBoxes[6].textContent === player
    let check_col_2 = squareBoxes[1].textContent === player && squareBoxes[4].textContent === player || squareBoxes[1].textContent === player && squareBoxes[7].textContent === player || squareBoxes[4].textContent === player && squareBoxes[7].textContent === player
    let check_col_3 = squareBoxes[2].textContent === player && squareBoxes[5].textContent === player || squareBoxes[2].textContent === player && squareBoxes[8].textContent === player || squareBoxes[5].textContent === player && squareBoxes[8].textContent === player
    return [check_row_1, check_row_2, check_row_3, check_col_1, check_col_2, check_col_3]
}
function computerGameplay(start_value, end_value, a) {
    for (let b = start_value; b < end_value; b = b+a) {
        console.log(b)
        if (squareBoxes[b].textContent === "") {
            console.log("ran")

            squareBoxes[b].textContent = player2
        }

    }
}

function comp_logic(inDex) {
    const [row1, row2, row3, col1, col2, col3] = computerPlayChecker(player2)
    const [row_a, row_b, row_c, col_a, col_b, col_c] = computerPlayChecker(player1)
    if (row1 || row_a) {
        console.log("ran")
        computerGameplay(0, 3, 1)
    }
    else if (row2 || row_b) {
        console.log(" row 2 ran")

        computerGameplay(3, 6, 1)
    }
    else if (row3 || row_c) {
        console.log("row 3 ran" )

        computerGameplay(6, 9, 1)
    }
    else if (col1 || col_a) {
        computerGameplay(0, 6, 3)
    }
    else if (col2 || col_b) {
        computerGameplay(1, 7, 3)
    }
    else if (col3 || col_c) {
        computerGameplay(2, 8, 3)
    }
    else{
        randomPicker(inDex)
        // console.log("@null" + randomNumber)
        // console.log("j" + j + boxes[listIndex][j], "k" + k + boxes[listIndex][k])
        squareBoxes[randomNumber].textContent = player2
    }
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

// if (!vsComputer) {
//     console.log("mad ooooo")
//         }
//         else {
//             let row1, row2, row3, col1, col2, col3 = boxes[listIndex][0]
//             let row2 = boxes[listIndex][1]
//             let row3 = boxes[listIndex][2]
//             let col1 = boxes[0][elementIndex]
//             let col2 = boxes[1][elementIndex]
//             let col3 = boxes[2][elementIndex]
//             if ((row1, row2, row3, col1, col2, col3 === row2 && (row1, row2, row3, col1, col2, col3 || row2) === player1)
//                 || (row1, row2, row3, col1, col2, col3 === row3 && (row1, row2, row3, col1, col2, col3 || row3) === player1)
//                 || (row2 === row3 && (row2 || row3) === player1)) {
//                 let nullRowIndex = boxes[listIndex].indexOf(null)
//                 squareBoxes[nullRowIndex].textContent = player2
//                 console.log("row worked")

//             }
//             else if ((col1 === col2 && (col1 || col2) === player1)
//                 || (col1 === col3 && (col1 || col3) === player1)
//                 || (col2 === col3 && (col2 || col3) === player1)) {
//                 let nullColIndex = boxes[listIndex].indexOf(null)
//                 squareBoxes[nullColIndex].textContent = player2
//                 console.log("column worked")


//             } else {
//                 console.log("else worked")

//             }
//         }