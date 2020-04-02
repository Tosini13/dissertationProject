
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
                console.log(this.id);
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
    weeks = ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"];
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
        this.htmlYear1.innerHTML = this.to.getFullYear();
        this.htmlMonth1.innerHTML = this.weeks[this.from.getMonth()];
        this.htmlDay1.innerHTML = this.from.getDate();
        // this.htmlMonth2.innerHTML = this.to.toLocaleString('default', { month: 'short' });
        this.htmlMonth2.innerHTML = this.weeks[this.to.getMonth()];
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
        let today = this.from.getDay();
        this.from.setDate(this.from.getDate() - today + 1);
        this.to.setDate(this.to.getDate() + (7 - today));
        this.printDates();
    }
}

//OBJECTS
const user = new User();
const calendar = new Calendar();


class Trainer {
    id;
    fname;
    lname;
    login;
    photo;
    description;
    fb;
    insta;
    yt;
    twitter;


    // addToSlider() {
    //     let slider = document.querySelector('.slick-track');
    //     let trainer = document.createElement('div');
    //     trainer.classList.add('btn');
    //     trainer.classList.add('trainer');
    //     //NAME
    //     let name = document.createElement('p');
    //     let nameTxt = document.createTextNode(this.fname + " " + this.lname);
    //     name.appendChild(nameTxt);
    //     //PHOTO
    //     let photo = document.createElement('img');
    //     photo.setAttribute("src", "images/trainers/" + this.photo);
    //     photo.setAttribute("alt", this.lname);
    //     //DESCRIPTION
    //     let desc = document.createElement('p');
    //     let descTxt = document.createTextNode(this.description);
    //     desc.appendChild(descTxt);
    //     //MEDIA
    //     let media = document.createElement('div');
    //     media.classList.add('trainerMedia');
    //     if (this.fb != "" && this.fb !== null) {
    //         let link = document.createElement('a');
    //         link.setAttribute("href", this.fb);
    //         let icon = document.createElement('i');
    //         icon.classList.add('icon-facebook');
    //         link.appendChild(icon);
    //         media.appendChild(link);
    //     }
    //     if (this.insta != "" && this.insta !== null) {
    //         let link = document.createElement('a');
    //         link.setAttribute("href", this.insta);
    //         let icon = document.createElement('i');
    //         icon.classList.add('icon-instagram');
    //         link.appendChild(icon);
    //         media.appendChild(link);
    //     }
    //     if (this.yt != "" && this.yt !== null) {
    //         let link = document.createElement('a');
    //         link.setAttribute("href", this.yt);
    //         let icon = document.createElement('i');
    //         icon.classList.add('icon-youtube');
    //         link.appendChild(icon);
    //         media.appendChild(link);
    //     }
    //     if (this.twitter != "" && this.twitter !== null) {
    //         let link = document.createElement('a');
    //         link.setAttribute("href", this.twitter);
    //         let icon = document.createElement('i');
    //         icon.classList.add('icon-twitter');
    //         link.appendChild(icon);
    //         media.appendChild(link);
    //     }
    //     //APPEND CHILDREN
    //     trainer.appendChild(name);
    //     trainer.appendChild(photo);
    //     trainer.appendChild(desc);
    //     trainer.appendChild(media);
    //     slider.appendChild(trainer);
    // }

    setMedia(fb, insta, yt, twitter) {
        this.fb = fb;
        this.insta = insta;
        this.yt = yt;
        this.twitter = twitter;
    }

    constructor(fname, lname, login, photo, description) {
        this.fname = fname;
        this.lname = lname;
        this.login = login;
        this.photo = photo;
        this.description = description;
    }
}

class Style {
    id;
    name;
    type;
    description;

    constructor(name, type, description) {
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

let menuHeight = document.getElementsByTagName('nav')[0].offsetHeight;
let screenWidth = screen.width;
// window.addEventListener("resize", displayWindowSize);
window.addEventListener("resize", function () {
    screenWidth = screen.width;
    console.log("resize");
});
function scrollMenu() {
    for (let subBtn of subBtns) {
        subBtn.addEventListener("click", scrollMenuTo);
    }

    function scrollMenuTo() {
        closeAll();
        let section = document.getElementById(this.getAttribute('data-section'));
        let addHeight = 0;
        if (screenWidth > 650) {
            addHeight = menuHeight;
        }
        window.scrollTo({ top: (section.offsetTop - addHeight), behavior: 'smooth' });
    }
}

function extraMenu() {
    for (let extraBtn of extraBtns) {
        extraBtn.addEventListener("click", showPopup);
    }

    function showPopup() {
        console.log(this.getAttribute('data-popup'));
        document.getElementById(this.getAttribute('data-popup')).classList.add("bigPopupsOpen");
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
        // toClose.classList.remove("bigPopupsOpen");
    }

    let bigPopups = document.querySelectorAll(".bigPopups");
    for (let popup of bigPopups) {
        popup.querySelector('.close').addEventListener("click", () => { closeBigPopups(popup) });
    }

    function closeBigPopups(toClose) {
        // toClose.style.display = "none";
        toClose.classList.remove("bigPopupsOpen");
    }
}

popupInit();

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
    // if (window.localStorage.getItem("trainers")) {
    //     console.log("storage");
    // } else {
    fetch("php/eventManager.php?getTrainers=" + true)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            data.map((element) => {
                let trainer = new Trainer(element.fname, element.lname, element.login, element.photo, element.description);
                trainer.setMedia(element.fb, element.insta, element.yt, element.twitter);
                trainer.id = element.id;
                // trainer.addToSlider();
                arr.push(trainer);
            });
            window.localStorage.setItem("trainers", JSON.stringify(arr));
        })
    console.log("database");
    // }
    // createTrainers();
}

function getStyles() {
    let arr = [];
    // if (window.localStorage.getItem("styles")) {
    //     console.log("storage");
    // } else {
    fetch("php/eventManager.php?getStyles=" + true)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            data.map((element) => {
                let style = new Style(element.name, element.type, element.description);
                style.id = element.id;
                arr.push(style);
            });
            window.localStorage.setItem("styles", JSON.stringify(arr));
        })
    console.log("database");
    // }
}

getTrainers();
getStyles();

// INSERT
function closePopups() {
    let popups = document.querySelectorAll(".popups");
    for (let popup of popups) {
        popup.style.display = "none";
    }

    let bigPopups = document.querySelectorAll(".bigPopups");
    for (let popup of bigPopups) {
        popup.style.display = "none";
    }
}

function addEvent(style, trainer, date) {
    fetch("php/eventManager.php?addEvent=" + true + "&styleId=" + style + "&trainerId=" + trainer + "&date=" + date)
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            console.log(data);
            if (parseInt(data) === 1) {
                setTip("Dodałeś wydarzenie!");
                closePopups();
                calendar.getEvents();
            } else {
                setTip("Oj, coś poszło nie tak...");
            }
        })
}

function addTrainer(fname, lname, login, phone, desc, fb, insta, yt, twitter, photo) {
    console.log("addTrainer=" + true + "&fname=" + fname + "&lname=" + lname + "&login=" + login + "&phone=" + phone + "&desc=" + desc + "&fb=" + fb + "&insta=" + insta + "&yt=" + yt + "&twitter=" + twitter + "&photo=" + photo.name);
    console.log(photo);
    console.log(photo.name);
    fetch("php/eventManager.php?addTrainer=" + true + "&fname=" + fname + "&lname=" + lname + "&login=" + login + "&phone=" + phone + "&desc=" + desc + "&fb=" + fb + "&insta=" + insta + "&yt=" + yt + "&twitter=" + twitter + "&photo=" + photo.name)
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            if (parseInt(data) === 1) {
                setTip("Dodałeś trenera!");
                closePopups();
            } else {
                setTip("Oj, coś poszło nie tak...");
                let response = document.createElement('div');
                response.classList.add('AjaxRes');
                response.innerHTML = data;
                document.body.appendChild(response);
            }
        })

    var form_data = new FormData();
    form_data.append("photo", photo);
    $.ajax({
        url: "php/filesManager.php",
        method: "POST",
        data: form_data,
        contentType: false,
        cache: false,
        processData: false,
        success: (data) => {
            // let response = document.createElement('div');
            // response.classList.add('AjaxRes');
            // response.innerHTML = data;
            // document.body.appendChild(response);
            console.log(data);
        }
    })
}

function addStyle(name, desc) {
    fetch("php/eventManager.php?addStyle=" + true + "&name=" + name + "&description=" + desc)
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            console.log(data);
            if (parseInt(data) === 1) {
                setTip("Dodałeś styl!");
                closePopups();
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

//UPDATE

function updateEvent(id, style, trainer, date) {
    console.log(id, style, trainer, date);
    fetch("php/eventManager.php?updateEvent=" + true + "&id=" + id + "&styleId=" + style + "&trainerId=" + trainer + "&date=" + date)
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            console.log(data);
            if (parseInt(data) === 1) {
                setTip("Zaktualizowałeś wydarzenie!");
                closePopups();
                calendar.getEvents();
            } else {
                setTip("Oj, coś poszło nie tak...");
            }
        })
}

function updateTrainer(fname, lname, login, phone, desc, fb, insta, yt, twitter, photo, id) {
    // Console.log(photo);
    if (photo === undefined) {
        photoName = "";
    } else {
        photoName = photo.name;
    }
    // photoName="trainer.jpg";
    console.log("php/eventManager.php?updateTrainer=" + true + "&fname=" + fname + "&lname=" + lname + "&login=" + login + "&phone=" + phone + "&desc=" + desc + "&fb=" + fb + "&insta=" + insta + "&yt=" + yt + "&twitter=" + twitter + "&photo=" + photoName + "&id=" + id);
    fetch("php/eventManager.php?updateTrainer=" + true + "&fname=" + fname + "&lname=" + lname + "&login=" + login + "&phone=" + phone + "&desc=" + desc + "&fb=" + fb + "&insta=" + insta + "&yt=" + yt + "&twitter=" + twitter + "&photo=" + photoName + "&id=" + id)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            if (parseInt(data) === 1) {
                setTip("Zaktualizowałeś trenera!");
                closePopups();
            } else {
                setTip("Oj, coś poszło nie tak...");
                let response = document.createElement('div');
                response.classList.add('AjaxRes');
                response.innerHTML = data;
                document.body.appendChild(response);
            }
        })

    if (photo !== undefined) {
        var form_data = new FormData();
        form_data.append("photo", photo);
        $.ajax({
            url: "php/filesManager.php",
            method: "POST",
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: (data) => {
                console.log(data);
            }
        })
    }
}

function updateStyle(id, name, desc) {
    fetch("php/eventManager.php?updateStyle=" + true + "&id=" + id + "&name=" + name + "&description=" + desc)
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            console.log(data);
            if (parseInt(data) === 1) {
                setTip("Zaktualizowałeś styl!");
                closePopups();
            } else {
                setTip("Oj, coś poszło nie tak...");
            }
        })
}


// REMOVE

function deleteEvent(id) {
    fetch("php/eventManager.php?deleteEvent=" + id)
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            console.log(data);
            if (parseInt(data) === 1) {
                setTip("Usunąłeś wydarzenie!");
                closePopups();
            } else {
                setTip("Oj, coś poszło nie tak...");
            }
        })
}

function deleteTrainer(id) {
    fetch("php/eventManager.php?deleteTrainer=" + id)
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            console.log(data);
            if (parseInt(data) === 1) {
                setTip("Usunąłeś trenera!");
                closePopups();
            } else {
                setTip("Oj, coś poszło nie tak...");
            }
        })
}

function deleteStyle(id) {
    fetch("php/eventManager.php?deleteStyle=" + id)
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            console.log(data);
            if (parseInt(data) === 1) {
                setTip("Usunąłeś styl!");
                closePopups();
            } else {
                setTip("Oj, coś poszło nie tak...");
            }
        })
}