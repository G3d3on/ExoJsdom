function shuffleChildren(parent) {
    let children = parent.children
    let i = children.length, k, temp
    while (--i > 0) {
        k = Math.floor(Math.random() * (i+1))
        temp = children[k]
        children[k] = children[i]
        parent.appendChild(temp)
    }
}

function showReaction(type, clickedBox){
    clickedBox.classList.add(type)
    if (type !== "sucess") {
        setTimeout(function(){
            clickedBox.classList.remove(type)
        }, 1500)
    }
}

function reset(){
    const btn = document.createElement("button")
    body.appendChild(btn)
    btn.innerText = "Recommencer?"
    btn.addEventListener("click", function () {
        board.querySelectorAll(".box").forEach(function(box) {
            box.classList.remove("sucess")
        })
        board.querySelectorAll(".box-clicked").forEach(function(clickedBox) {
            clickedBox.classList.remove("box-clicked")
        })
    shuffleChildren(board)
    nb = 1
    body.removeChild(btn)
    })
}

const box = document.createElement("div")
box.classList.add("box")
const board = document.querySelector("#board")
const body = document.querySelector("body")

let nb = 1

for(let i = 1; i <= 10; i++) {
    let newbox = box.cloneNode()
    newbox.innerText = i
    board.appendChild(newbox)

    newbox.addEventListener("click", function() {
        shuffleChildren(board) // a placer a different endroit pour  que la premiere div ai l'animation aussi.
        if (i == nb) {
            newbox.classList.add("box-clicked")
            if (nb == board.children.length) {
                board.querySelectorAll(".box").forEach(function(box) {
                   showReaction("sucess", box)
                }) 
                reset()  
            //nb = 0 // si nb = 1 apres victoire alors nb sera égal a 2 au départ et la box [i1] ne sera pas clicable.
            }
        shuffleChildren(board)
        nb++
        }
        else if (i > nb) {
            showReaction("error", newbox)
            nb = 1 
            board.querySelectorAll(".box-clicked").forEach(function(clickedBox) {
                clickedBox.classList.remove("box-clicked")
            })
            shuffleChildren(board)
        }         
        else {
            showReaction("notice", newbox)
        } 
    })
shuffleChildren(board)
}

