//TU ZMIENIĆ NA EVENT ID!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function addParticipant() {
    fetch("php/eventManager.php?setParticipant=" + this.getAttribute("data-event-id"))
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (data) {
                showPopupAnswer("Dziękujemy za zapisanie się na wydarzenie");
            } else {
                showPopupAnswer("Oj, coś poszło nie tak...");
            }

        })
}

function removeUserFromEvent() {
    fetch("php/eventManager.php?removeUserFromEvent=" + this.getAttribute("data-dance-id"))
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (data) {
                showPopupAnswer("Usunąłeś swoją obezność w wydarzeniu");
            } else {
                showPopupAnswer("Oj, coś poszło nie tak...");
            }
        })
}

function IfLoggedIn() {
    if (sessionStorage.getItem('login')) {
        return true;
    } else {
        return false;
    }
}

// LOGIN

function setLogin() {
    fetch("php/accountManager.php?ifLoggedIn")
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            console.log(data);
            if (data) {
                sessionStorage.setItem('login', data);
                user.getUserEvents();
                return true;
            } else {
                sessionStorage.removeItem('login');
                return false;
            }
        })
}
setLogin();
function logout() {
    sessionStorage.removeItem('login');
}


// TOGGLE SUB
function toggleEvents() {
    let days = document.querySelectorAll('#timetableEvents .btn');
    console.log(days);
    for (let day of days) {
        day.addEventListener('click', toggleEvent);
    }

    function toggleEvent() {
        if (this.nextElementSibling.style.display == 'none') {
            this.nextElementSibling.style.display = 'block';
        } else {
            this.nextElementSibling.style.display = 'none';
        }
    }
}

function show_style(obj) {
    function closeAll() {
        $('#styles p').each(function () {
            $(this).hide("fast");
        })
    }
    if ($(obj).next("p").css("display") === "none") {
        closeAll();
        $(obj).next('p').show("fast");
    } else {
        closeAll();
    }
}

function showStyle() {
    let styles = document.querySelectorAll('#styles .btn');
    for (let style of styles) {
        style.addEventListener('click', toggleStyle);
    }

    function toggleStyle() {
        if (this.nextElementSibling.classList.contains('showStyle')) {
            this.nextElementSibling.classList.remove('showStyle')
        } else {
            for (let style of styles) {
                style.nextElementSibling.classList.remove('showStyle');
            }
            this.nextElementSibling.classList.add('showStyle')
        }
    }
}
// showStyle();


//BUTTON PRESS
function buttonPress() {
    let buttons = document.getElementsByClassName('btnPress');
    for (let button of buttons) {
        button.addEventListener("click", press);
    }
    function press() {
        this.style.borderBottomWidth = "1px";
        setTimeout(() => { this.style.borderBottomWidth = "2px"; }, 100);
    }
}
buttonPress();

// ON LOAD!
// window.onload = function () {
// };

// ON SCROLL
window.onscroll = function () {
    scrollFunction();
};