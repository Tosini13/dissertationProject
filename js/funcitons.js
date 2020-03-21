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
    $(obj).next('p').slideToggle();
}

// ON LOAD!
// window.onload = function () {
// };

// ON SCROLL
window.onscroll = function () {
    scrollFunction();
};