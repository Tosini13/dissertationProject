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
        });
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
        });
}

// TOGGLE SUB
function toggleEvents() {
    let days = document.querySelectorAll('#timetableEvents .btn');
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
            $(this).slideUp("fast");
        });
    }
    if ($(obj).next("p").css("display") === "none") {
        closeAll();
        $(obj).next('p').slideDown("slow");
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
            this.nextElementSibling.classList.remove('showStyle');
        } else {
            for (let style of styles) {
                style.nextElementSibling.classList.remove('showStyle');
            }
            this.nextElementSibling.classList.add('showStyle');
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
