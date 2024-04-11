let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let currentPlayer = "X"; // Player starts first
let computerPlayer = "O";

let turnCounter = 0;

let winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    currentPlayer = "X"; // Reset to user's turn
    turnCounter = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    newGameBtn.classList.add("hide");
    msg.innerText = "Winner";
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
};

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        if (box.innerText === "") {
            box.disabled = false;
        }
    });
};

const showWinner = (winner) => {
    if (winner === "X") {
        msg.innerText = "Congratulations, You Won!";
    } else if (winner === "O") {
        msg.innerText = "Sorry, I Won!";
    } else {
        msg.innerText = "It's a Tie!";
    }
    msgContainer.classList.remove("hide");
    disableBoxes();
    newGameBtn.classList.remove("hide");
};


const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        
        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return; // Exit function early if winner is found
            }
        }
    }
    // Check for a tie if all moves have been made
    if (turnCounter === 9) {
        msg.innerText = "It's a tie!";
        msgContainer.classList.remove("hide");
        newGameBtn.classList.remove("hide");
    }
};

const computerPlay = () => {
    // Simulate computer's move (randomly choose an available box)
    let availableBoxes = Array.from(boxes).filter((box) => box.innerText === "");
    if (availableBoxes.length > 0) {
        let randomIndex = Math.floor(Math.random() * availableBoxes.length);
        availableBoxes[randomIndex].innerText = computerPlayer;
        currentPlayer = "X"; // Switch to user's turn
        turnCounter++;
        checkWinner();
    }
};

// Event listeners for user's turn
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            box.innerText = currentPlayer;
            box.disabled = true;
            turnCounter++;
            checkWinner();
            if (currentPlayer === "X") {
                currentPlayer = "O"; // Switch to computer's turn
                setTimeout(computerPlay, 500); // Delay for computer's move (500ms)
            }
        }
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
