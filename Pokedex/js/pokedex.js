window.onload = init;
var headers = {};
var url = "https://express-pokedex-2020.herokuapp.com";

function init() {
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        headers = {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem("token")
            }
        }
        loadPokemon();
    } else {
        window.location.href = "index.html"
    }
}

function loadPokemon() {
    axios.get(url + "/pokemon", headers)
        .then((res) => {
            displayPokemon(res.data.message);
        }).catch((err) => {
            console.log(err);
        }
    )
}

function displayPokemon(pokemon) {
    var body = document.querySelector("body");
    for(var i = 0; i < pokemon.length; i++) {
        body.innerHTML += `<h3>${pokemon[i].pok_name}</h3>`
    }
}