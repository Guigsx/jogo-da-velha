let boxs

document.addEventListener("DOMContentLoaded", () => {
    boxs = document.querySelectorAll(".box")
    let currentPlayer = "X"
    let gameOver = false

    boxs.forEach(box => {
        box.addEventListener("click", () => {
            if (box.textContent === "" && !gameOver) {
                box.textContent = currentPlayer
                box.classList.add('taken')
                currentPlayer = currentPlayer === "X" ? "O" : "X"
            }
            checkWinner()
        })
    })
})

const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

function checkWinner() {
    for (const [a, b, c] of combinations) {
        if (
            boxs[a].textContent !== "" &&
            boxs[a].textContent === boxs[b].textContent &&
            boxs[a].textContent === boxs[c].textContent
        ) {

            // O jogo acabou e tem um vencedor.

            setTimeout(() => {
                endGame(`<h2>${boxs[a].textContent} venceu!</h2><p>Parabéns ao vencedor</p>`)
            }, 250)


            gameOver = true
            return boxs[a].textContent
        }
    }

    if ([...boxs].every(box => box.textContent !== "")) {
        gameOver = true

        setTimeout(() => {
            endGame("Empate!")
        }, 250);
    }
    return null
}

function endGame(message) {
    const endBox = document.getElementById('end-box')
    const endMessage = document.getElementById('end-message')
    const overlay = document.getElementById('overlay')

    endMessage.innerHTML = message
    endBox.style.display = 'block'
    overlay.style.display = 'block'

    boxs.forEach(box => {
        box.classList.add("taken")
    })
}

const restart = document.querySelectorAll('.restart')
restart.forEach(restartButton => {
    restartButton.addEventListener("click", function () {
        location.reload()
    })
})