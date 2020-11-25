window.onload = init;

function init() {

    if (!localStorage.getItem("token")) {
        document.querySelector('.btn-secondary').addEventListener('click', () => {
            window.location.href = "index.html";
        });
    
        document.querySelector('.btn-primary').addEventListener('click', signin);
    } else {
        window.location.href = "pokedex.html";
    }
}

function signin() {
    const name = document.querySelector('#input-name').value;
    const mail = document.querySelector('#input-mail').value;
    const pass = document.querySelector('#input-password').value;

    axios({
        method: 'post',
        url: "https://express-pokedex-2020.herokuapp.com/user/signin",
        data: {
            user_name: name,
            user_mail: mail,
            user_password: pass,
        }
    }).then((res) => {
        console.log(res);
        alert("Registro exitoso!")
        window.location.href = "login.html";
    }).catch((err) => {
        console.log(err);
    })
}