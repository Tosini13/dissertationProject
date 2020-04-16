
//TIP

function setTip(text) {
    let tip = document.getElementById('tip');
    tip.getElementsByTagName('p')[0].innerHTML = text;
    tip.classList.add('openTip');
    let interval = setInterval(counter, 2500);
    function counter() {
        tip.classList.remove('openTip');
        clearInterval(interval);
    }
}


function checkRegister() {
    let form = document.getElementById("register");
    let submit = form.getElementsByClassName("btn")[0];
    let password = form.getElementsByClassName("password")[0];
    let passwordRepeat = form.getElementsByClassName("passwordRepeat")[0];

    function checkPassword() {
        if (password.value.localeCompare(passwordRepeat.value) == 0) {
            return true;
        } else {
            setTip("Hasło nie zostało poprawnie powtórzone");
            return false;
        }
    }

    submit.addEventListener("click", function (event) {
        if (!checkPassword()) {
            console.log("Wrong");
            event.preventDefault();
        }
    });
}

checkRegister();
