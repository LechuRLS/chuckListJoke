const fetchJokeBtn = document.getElementById("fetchJoke")
const jokeList = document.getElementById("jokeList")

let jokes = []

document.addEventListener("DOMContentLoaded", () => {
    const stored = localStorage.getItem("chistesChuck")
    if (stored) {
        jokes = JSON.parse(stored);
        renderJokes();
    }
})

async function getJoke() {
    try {
        const res = await fetch("https://api.chucknorris.io/jokes/random")
        const data = await res.json();
        jokes.push(data)
        saveToLocalStorage()
        renderJokes()
    } catch (err) {
        console.error("Error al obtener datos", err)
    }
}

fetchJokeBtn.addEventListener("click", getJoke)

function saveToLocalStorage() {
    localStorage.setItem("chistesChuck", JSON.stringify(jokes))
}

function deleteJoke(index) {
    jokes.splice(index, 1)
    saveToLocalStorage()
    renderJokes()
}

function renderJokes() {
    jokeList.innerHTML = ""
    jokes.forEach((joke, index) => {
        const li = document.createElement("li")
        li.textContent = joke.value

        const deleteBtn= document.createElement("button")
        deleteBtn.textContent = "Eliminar"
        deleteBtn.addEventListener("click", () => deleteJoke(index))

        li.appendChild(deleteBtn)
        jokeList.appendChild(li)
    })
}

const clearAllBtn = document.getElementById("clearAll")

clearAllBtn.addEventListener("click", () => {
    jokes = []
    saveToLocalStorage()
    renderJokes()
})