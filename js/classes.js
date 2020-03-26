
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

class Trainer {
    id;
    fname;
    lname;
    login;
    img;
    description;

    constructor(fname, lname, login, img, description) {
        this.fname = fname;
        this.lname = lname;
        this.login = login;
        this.img = img;
        this.description = description;
    }
}

class Style {
    name;
    type;
    description;

    constructor(name, type, description) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.description = description;
    }
}

// MENU

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById('hamburger').classList.add("sticky_burger");
    } else {
        document.getElementById('hamburger').classList.remove("sticky_burger");
    }
}

var hamburger = document.getElementById('hamburger');
hamburger.addEventListener("click", moveMenu);
var menu = document.getElementById('menu');
var menuBtns = document.querySelectorAll('#menu > ul > li > a');
var subBtns = document.querySelectorAll('#menu > ul > li > ul > li > a');
var extraBtns = document.querySelectorAll('#menu > ul > li > ul > li > div > a');

function moveMenu() {
    if (menu.classList.contains('openMenu')) {
        closeAll();
    } else {
        hamburger.classList.add('btnClicked');
        menu.classList.add('openMenu');
    }
}

function closeAll() {
    closeAllsub();
    hamburger.classList.remove('btnClicked');
    menu.classList.remove('openMenu');
}

function subMenu() {
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
    for (let menuBtn of menuBtns) {
        menuBtn.nextElementSibling.classList.remove('submenuOpen');
        menuBtn.classList.remove('btnClicked'); // BUTTON STYLE
    }
}

function scrollMenu() {
    for (let subBtn of subBtns) {
        subBtn.addEventListener("click", scrollMenuTo);
    }

    function scrollMenuTo() {
        closeAll();
        let section = document.getElementById(this.getAttribute('data-section'));
        window.scrollTo({
            top: section.offsetTop,
            left: 0,
            behaviour: "smooth"
        });
    }
}

function extraMenu() {
    for (let extraBtn of extraBtns) {
        extraBtn.addEventListener("click", showPopUp);
    }

    function showPopUp() {
        console.log(this);
        console.log(this.getAttribute('data-popup'));
        document.getElementById(this.getAttribute('data-popup')).style.display = "block";
        closeAll();
    }
}

subMenu();
scrollMenu();
extraMenu();

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

function popupInit() {
    var popups = document.querySelectorAll(".popups");
    for (let popup of popups) {
        popup.querySelector('.close').addEventListener("click", () => { closePopup(popup) });
    }
    function closePopup(toClose) {
        toClose.style.display = "none";
    }
}

popupInit();

//TIP

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

// GATES
// GET
function getTrainers() {
    let arr = [];
    if (window.localStorage.getItem("trainers")) {
        console.log("storage");
    } else {
        fetch("php/eventManager.php?getTrainers=" + true)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                data.map((element) => {
                    let trainer = new Trainer(element.fname, element.lname, element.login, element.photo, element.description);
                    trainer.id = element.id;
                    console.log(trainer);
                    arr.push(trainer);
                });
                window.localStorage.setItem("trainers", JSON.stringify(arr));
            })
        console.log("database");
    }
    // createTrainers();
}

function getStyles() {
    let arr = [];
    if (window.localStorage.getItem("styles")) {
        console.log("storage");
    } else {
        fetch("php/eventManager.php?getStyles=" + true)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                data.map((element) => {
                    console.log(element.id);
                    let style = new Style(element.id, element.name, element.type, element.description);
                    style.id = element.id;
                    arr.push(style);
                });
                window.localStorage.setItem("styles", JSON.stringify(arr));
            })
        console.log("database");
    }
}

getTrainers();
getStyles();

// INSERT

function addEvent(style, trainer, date) {
    fetch("php/eventManager.php?addEvent=" + true + "&styleId=" + style + "&trainerId=" + trainer + "&date=" + date)
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            console.log(data);
            if (parseInt(data) === 1) {
                setTip("Dodałeś wydarzenie!");
            } else {
                setTip("Oj, coś poszło nie tak...");
            }
        })
}

function addTrainer(fname, lname, login, phone, desc, fb, insta, yt, twitter) {
    console.log("addTrainer=" + true + "&fname=" + fname + "&lname=" + lname + "&login=" + login + "&phone=" + phone + "&desc=" + desc + "&fb=" + fb + "&insta=" + insta + "&yt=" + yt + "&twitter=" + twitter);
    fetch("php/eventManager.php?addTrainer=" + true + "&fname=" + fname + "&lname=" + lname + "&login=" + login + "&phone=" + phone + "&desc=" + desc + "&fb=" + fb + "&insta=" + insta + "&yt=" + yt + "&twitter=" + twitter)
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            console.log(data);
            if (parseInt(data) === 1) {
                setTip("Dodałeś trenera!");
            } else {
                setTip("Oj, coś poszło nie tak...");
            }
        })
}

// SECTION CREATE

function createTrainers() {
    console.log(JSON.parse(window.localStorage.getItem("trainers")));
    console.log(JSON.parse(window.localStorage.getItem("styles")));
}