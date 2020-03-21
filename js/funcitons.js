
class Event {
    id;
    trainer;
    danceId; //id
    danceName
    date;

    signUp() {
        fetch("php/eventManager.php?setParticipant=" + this.id)
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                console.log(data);
                this.tip(parseInt(data));
            })
    }

    signOut() {
        fetch("php/eventManager.php?removeParticipant=" + this.id)
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                console.log(data);
                this.tip(parseInt(data));
            })
    }

    tip(res) {
        switch (res) {
            case 0:
                setTip('Aby dołączyć musisz być zalogowany');
                break;
            case 1:
                user.signIn(this.id);
                setTip('Dziękujemy za zapisanie się na wydarzenie');
                break;
            case 2:
                user.signOut(this.id);
                setTip('Usunąłeś swoją obezność w wydarzeniu');
                break;
            case -1:
                setTip('Oj, coś poszło nie tak...');
                break;
            default:

        }
    }
}

class Calendar {
    to;
    from;

    weekdays = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];
    firstTime = "000000";
    lastTime = "235959";
    htmlDay1;
    htmlMonth1;
    htmlYear1;
    htmlDay2;
    htmlMonth2;
    htmlYear2;

    changeDates(sign) {
        this.to.setDate(this.to.getDate() + sign);
        this.from.setDate(this.from.getDate() + sign);
        this.printDates();
    }

    printDates() {
        this.htmlYear1.innerHTML = this.from.getFullYear();
        this.htmlMonth1.innerHTML = this.from.toLocaleString('default', { month: 'short' });
        this.htmlDay1.innerHTML = this.from.getDate();
        this.htmlMonth2.innerHTML = this.to.toLocaleString('default', { month: 'short' });
        this.htmlDay2.innerHTML = this.to.getDate();
        this.showDates();
        this.getEvents();
    }

    getEvents() {
        let arr = this.showDates()
        this.loadFile("php/eventManager.php?from=" + arr[0] + "&to=" + arr[1]);
    }


    orderEvents(data) {
        let eventArr = []; //2 DIMENSIONAL ARRAY FOR WEEKS
        for (let num in this.weekdays) {
            this.weekdays[num]; //day
            eventArr[num] = [];
            for (let key in data) {
                let date = new Date(data[key].date);
                if (num == date.getDay()) {
                    let event = new Event();
                    //ADD NAME
                    event.danceName = data[key].dance;
                    //ADD PERSON
                    event.danceId = data[key].id //data-dance-id
                    event.id = data[key].eventId; //data-event-id
                    event.trainer = data[key].trainer //data-event-trainer
                    event.date = data[key].date //data-event-date
                    eventArr[num].push(event);
                    // person.addEventListener("click", createPopup);
                }
            }
        }
        createEvents(eventArr);
    }

    loadFile(p) {
        fetch(p)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.orderEvents(data);
            })
    }

    showDates() {
        let month1 = this.from.getMonth() + 1;
        let month2 = this.to.getMonth() + 1;
        if (month1 < 10) {
            month1 = "0" + month1;
        }
        if (month2 < 10) {
            month2 = "0" + month2;
        }
        let day1 = this.from.getDate();
        let day2 = this.to.getDate();
        if (day1 < 10) {
            day1 = "0" + day1;
        }
        if (day2 < 10) {
            day2 = "0" + day2;
        }
        let arr = [];
        let from = this.from.getFullYear() + month1 + day1 + this.firstTime;
        let to = this.to.getFullYear() + month2 + day2 + this.lastTime;
        arr.push(from);
        arr.push(to);
        return arr;
    }

    constructor() {
        this.htmlDay1 = document.getElementById('day1');
        this.htmlMonth1 = document.getElementById('month1');
        this.htmlYear1 = document.getElementById('year');
        this.htmlDay2 = document.getElementById('day2');
        this.htmlMonth2 = document.getElementById('month2');

        this.from = new Date();
        this.to = new Date();
        this.from.setDate(this.from.getDate() - (this.from.getDay() + 6) % 7);
        this.to.setDate(this.from.getDate() + 6);

        this.printDates();
    }
}

class myDate {
    minute;
    hour;
    day;
    month;
    year;
}

class Validation {
    checkIfUserExists(login, mail, path) {
        fetch(path)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
    }
}


var arr = new Array();

class User {

    ifTakePartIn(id) {
        let events = localStorage.getItem('userEvents').split(",");
        for (let key in events) {
            if (parseInt(events[key]) == parseInt(id)) {
                return true;
            }
        }
        return false;
    }

    signOut(id) {
        let events = localStorage.getItem('userEvents').split(",");
        for (let key in events) {
            if (parseInt(events[key]) == parseInt(id)) {
                events.splice(key, 1);
            }
        }
        localStorage.setItem('userEvents', events);
    }

    signIn(id) {
        console.log(localStorage.getItem('userEvents'));
        let events = localStorage.getItem('userEvents').split(",");
        console.log(events);
        console.log(id);
        events.push(id);
        console.log(events);
        localStorage.setItem('userEvents', events);
        console.log(localStorage.getItem('userEvents').split(","));
    }

    getUserEvents() {
        localStorage.setItem('userEvents', []);
        fetch("php/eventManager.php?getUserEvents")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let events = [];
                for (let item of data) {
                    events.push(item.id);
                }
                localStorage.setItem('userEvents', events);
                console.log(localStorage.getItem('userEvents').split(","));
            })
    }

    constructor() {
        this.getUserEvents();
    }
}

function show_style(obj) {
    $(obj).next('p').slideToggle();
}


function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById('hamburger').classList.add("sticky_burger");
    } else {
        document.getElementById('hamburger').classList.remove("sticky_burger");
    }
}

// POPUP

function createPopup(event) {

    if (IfLoggedIn()) {
        popup.getElementsByClassName('signUp')[0].addEventListener("click", addParticipant);
    } else {
        popup.getElementsByClassName('signUp')[0].addEventListener("click", joinResponse);
        function joinResponse() {
            showPopupAnswer("Aby się zapisać musisz być zalogowany!")
        }
    }

    fetch("php/eventManager.php?getComments=" + this.getAttribute("data-dance-id"))
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for (key in data) {
                let comment = document.createElement('p');
                let author = document.createElement('span');
                author.appendChild(document.createTextNode(data[key].login + " ~ "));
                comment.appendChild(author);
                comment.appendChild(document.createTextNode(data[key].comment));
                comments.appendChild(comment);
            }
        })

}

function closePopup() {
    document.getElementById('popupResponse').style.display = "none";
    popup.style.display = "none";
}

function setTip(text) {
    let tip = document.getElementById('tip');
    tip.innerHTML = text;
    tip.classList.add('openTip');
    let interval = setInterval(counter, 2500);
    function counter() {
        tip.classList.remove('openTip');
        clearInterval(interval);
    }
}

function newComment() {
    let comments = document.getElementsByClassName('comments')[0];
    let newComment = document.createElement('div');
    let content = document.createElement('textarea');
    content.classList.add('commentContent');
    content.setAttribute('placeholder', 'Napisz coś miłego...');
    newComment.appendChild(content);
    let btn = document.createElement('a');
    btn.classList.add('btn');
    btn.classList.add('btnPostComment');
    btn.setAttribute("data-dance-id", this.getAttribute("data-dance-id"));
    btn.addEventListener("click", addComment);
    let btnText = document.createTextNode('Opublikuj');
    btn.appendChild(btnText);
    newComment.appendChild(btn);
    comments.appendChild(newComment);
}

function addComment() {
    let content = document.getElementsByClassName('commentContent')[0].value;
    fetch("php/eventManager.php?setComment=" + content + "&danceId=" + this.getAttribute("data-dance-id"))
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        })
}


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
// MENU
var hamburger = document.getElementById('hamburger');
hamburger.addEventListener("click", moveMenu);
var menu = document.getElementById('menu');
function moveMenu() {
    if (menu.classList.contains('openMenu')) {
        closeAllsub();
        hamburger.classList.remove('btnClicked');
        menu.classList.remove('openMenu');
    } else {
        hamburger.classList.add('btnClicked');
        menu.classList.add('openMenu');
    }
}

function subMenu() {
    var menuBtns = document.querySelectorAll('#menu > ul > li > a');
    for (let menuBtn of menuBtns) {
        menuBtn.addEventListener("click", moveSubMenu);
    }

    function moveSubMenu() {
        if (this.nextElementSibling.classList.contains('submenuOpen')) {
            this.nextElementSibling.classList.remove('submenuOpen');
            this.classList.remove('btnClicked'); // BUTTON STYLE
        } else {
            closeAllsub();
            this.nextElementSibling.classList.add('submenuOpen');
            this.classList.add('btnClicked'); // BUTTON STYLE
        }
    }
}

function closeAllsub() {
    let subMenus = document.querySelectorAll('#menu > ul > li > a');
    for (let subMenu of subMenus) {
        subMenu.nextElementSibling.classList.remove('submenuOpen');
        subMenu.classList.remove('btnClicked'); // BUTTON STYLE
        // subMenu.classList.remove('submenuOpen');
    }
}

subMenu();

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

//toggleEvents();
//DOESN'T WORK BECAUSE OF LOADING!


// SLIDER

$(document).ready(function () {
    $(".trainers").slick({
        prevArrow: '<i class="demo-icon icon-ico_arrow-left slick-my-next"></i>',
        nextArrow: '<i class="demo-icon icon-ico_arrow-right slick-my-prev"></i>',
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [{
            breakpoint: 979,
            settings: {
                // centerMode: true,
                dots: true,
                arrows: false
            }
        }]
    });
});

// ON LOAD!
window.onload = function () {
    // user.getUserEvents();
};

// ON SCROLL
window.onscroll = function () {
    scrollFunction();
};