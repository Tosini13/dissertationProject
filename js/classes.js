
class MyStorage {
    constructor() {
        this.trainers = [];
        this.styles = [];
    }
}
//OBJECTS
var myStorage = new MyStorage();

class Event {

    constructor() {
        this.id = null;
        this.trainer = null;
        this.danceId = null; //id
        this.danceName = null;
        this.date = null;
    }

    signUp() {
        fetch("php/eventManager.php?setParticipant=" + this.id)
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                console.log(data);
                this.tip(parseInt(data));
            });
    }

    signOut() {
        fetch("php/eventManager.php?removeParticipant=" + this.id)
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                console.log(data);
                this.tip(parseInt(data));
            });
    }

    tip(res) {
        switch (res) {
            case 0:
                setTip('Aby dołączyć musisz być zalogowany');
                closePopups();
                break;
            case 1:
                console.log(this.id);
                if (typeof user !== "undefined") {
                    user.signIn(this.id);
                }
                setTip('Dziękujemy za zapisanie się na wydarzenie');
                closePopups();
                break;
            case 2:
                if (typeof user !== "undefined") {
                    user.signOut(this.id);
                }
                setTip('Usunąłeś swoją obecność w wydarzeniu');
                closePopups();
                break;
            case -1:
                setTip('Oj, coś poszło nie tak...');
                closePopups();
                break;
            default:

        }
    }
}

class Calendar {
    // events = [];

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
        let arr = this.showDates();
        this.loadFile("php/eventManager.php?from=" + arr[0] + "&to=" + arr[1]);
    }

    orderEvents(data) {
        let eventArr = []; //2 DIMENSIONAL ARRAY FOR WEEKS
        for (let num in this.weekdays) {
            this.weekdays[num]; //day
            eventArr[num] = [];
            for (let key in data) {
                let eventDate = moment(data[key].date, "YYYY-MM-DD HH:mm:ss");
                if (num == eventDate.day()) {
                    let event = new Event();
                    //ADD NAME
                    event.danceName = data[key].dance;
                    //ADD PERSON
                    event.danceId = data[key].id; //data-dance-id
                    event.id = data[key].eventId; //data-event-id
                    event.trainer = data[key].trainer; //data-event-trainer
                    event.date = data[key].date; //data-event-date
                    eventArr[num].push(event);
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
            });
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
        this.to = null;
        this.from = null;

        this.weekdays = ["poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota", "niedziela"];
        this.weeks = ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"];
        this.firstTime = "000000";
        this.lastTime = "235959";

        this.htmlDay1 = document.getElementById('day1');
        this.htmlMonth1 = document.getElementById('month1');
        this.htmlYear1 = document.getElementById('year');
        this.htmlDay2 = document.getElementById('day2');
        this.htmlMonth2 = document.getElementById('month2');
        // this.htmlYear2 = null;

        this.from = new Date();
        this.to = new Date();
        let today = this.from.getDay();
        this.from.setDate(this.from.getDate() - today + 1);
        this.to.setDate(this.to.getDate() + (7 - today));
        this.printDates();
    }
}

//OBJECTS
var calendar = new Calendar();
// var user = new User();


class Trainer {

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


        this.id = null;
        this.fb = null;
        this.insta = null;
        this.yt = null;
        this.twitter = null;

    }
}

class Style {
    constructor(name, type, description) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.id = null;
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
        });

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
        });
}

// GATES
// GET
function getTrainers() {
    let arr = [];
    fetch("php/eventManager.php?getTrainers=" + true, {
        mode: "cors"
    })
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
            myStorage.trainers = arr;
            updateTrainerSelects(myStorage.trainers);
        })
        .catch((error) => {
            console.log("error");
            console.log(error);
        });
}

function getStyles() {
    let arr = [];
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
            myStorage.styles = arr;
            updateStyleSelects();
            fillStyles(myStorage.styles);
        })
        .catch((error) => {
            console.log("error");
            console.log(error);
        });
}

getTrainers();
getStyles();

console.log(myStorage);

function updateStyleSelects() {
    let styleSelects = document.querySelectorAll("select.style");
    for (let styleSelect of styleSelects) {
        styleSelect.innerHTML = "";
        for (let style of myStorage.styles) {
            let option = document.createElement("option");
            option.setAttribute("value", style.id);
            option.innerHTML = style.name;
            styleSelect.appendChild(option);
        }
        // styleSelect.value = styles[0].id;
    }
}

function updateTrainerSelects() {
    let trainerSelects = document.querySelectorAll("select.trainer");
    for (let trainerSelect of trainerSelects) {
        trainerSelect.innerHTML = "";
        for (let trainer of myStorage.trainers) {
            let option = document.createElement("option");
            option.setAttribute("value", trainer.id);
            option.innerHTML = trainer.fname + " " + trainer.lname;
            trainerSelect.appendChild(option);
        }
        // trainerSelect.value = trainers[0].id;
    }
}

// INSERT
function closePopups() {
    let popups = document.querySelectorAll(".popups");
    for (let popup of popups) {
        popup.style.display = "none";
    }

    let bigPopups = document.querySelectorAll(".bigPopups");
    for (let popup of bigPopups) {
        popup.classList.remove("bigPopupsOpen");
    }
}

// function addEvent(style, trainer, date) {
//     fetch("php/eventManager.php?addEvent=" + true + "&styleId=" + style + "&trainerId=" + trainer + "&date=" + date)
//         .then((response) => {
//             return response.text()
//         })
//         .then((data) => {
//             console.log(data);
//             if (parseInt(data) === 1) {
//                 setTip("Dodałeś wydarzenie!");
//                 closePopups();
//                 calendar.getEvents();
//             } else {
//                 setTip("Oj, coś poszło nie tak...");
//             }
//         });
// }

function addEvent(style, trainer, date) {
    const formData = new FormData();
    formData.append("addEvent", true);
    formData.append("styleId", style);
    formData.append("trainerId", trainer);
    formData.append("date", date);
    fetch("php/eventManager.php", {
        method: "post",
        body: formData
    })
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
        });
}


function addTrainer(fname, lname, login, phone, desc, fb, insta, yt, twitter, photo) {
    const formData = new FormData();
    formData.append("addTrainer", true);
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("login", login);
    formData.append("phone", phone);
    formData.append("desc", desc);
    formData.append("fb", fb);
    formData.append("insta", insta);
    formData.append("yt", yt);
    formData.append("twitter", twitter);
    formData.append("photo", photo.name);
    fetch("php/eventManager.php", {
        method: "post",
        body: formData
    })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            if (parseInt(data) === 1) {
                setTip("Dodałeś trenera!");
                getTrainers();
                closePopups();
            } else {
                setTip("Oj, coś poszło nie tak...");
                let response = document.createElement('div');
                response.classList.add('AjaxRes');
                response.innerHTML = data;
                document.body.appendChild(response);
            }
        });

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


// function addTrainer(fname, lname, login, phone, desc, fb, insta, yt, twitter, photo) {
//     fetch("php/eventManager.php?addTrainer=" + true + "&fname=" + fname + "&lname=" + lname + "&login=" + login + "&phone=" + phone + "&desc=" + desc + "&fb=" + fb + "&insta=" + insta + "&yt=" + yt + "&twitter=" + twitter + "&photo=" + photo.name)
//         .then((response) => {
//             return response.text();
//         })
//         .then((data) => {
//             if (parseInt(data) === 1) {
//                 setTip("Dodałeś trenera!");
//                 getTrainers();
//                 closePopups();
//             } else {
//                 setTip("Oj, coś poszło nie tak...");
//                 let response = document.createElement('div');
//                 response.classList.add('AjaxRes');
//                 response.innerHTML = data;
//                 document.body.appendChild(response);
//             }
//         });

//     var form_data = new FormData();
//     form_data.append("photo", photo);
//     $.ajax({
//         url: "php/filesManager.php",
//         method: "POST",
//         data: form_data,
//         contentType: false,
//         cache: false,
//         processData: false,
//         success: (data) => {
//             // let response = document.createElement('div');
//             // response.classList.add('AjaxRes');
//             // response.innerHTML = data;
//             // document.body.appendChild(response);
//             console.log(data);
//         }
//     })
// }

// function addStyle(name, desc) {
//     fetch("php/eventManager.php?addStyle=" + true + "&name=" + name + "&description=" + desc)
//         .then((response) => {
//             return response.text()
//         })
//         .then((data) => {
//             console.log(data);
//             if (parseInt(data) === 1) {
//                 setTip("Dodałeś styl!");
//                 getStyles();
//                 closePopups();
//             } else {
//                 setTip("Oj, coś poszło nie tak...");
//             }
//         });
// }

function addStyle(name, desc) {
    const formData = new FormData();
    formData.append("addStyle", true);
    formData.append("name", name);
    formData.append("description", desc);
    fetch("php/eventManager.php", {
        method: "POST",
        body: formData
    })
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            console.log("POST");
            console.log(data);
            if (parseInt(data) === 1) {
                setTip("Dodałeś styl!");
                getStyles();
                closePopups();
            } else {
                setTip("Oj, coś poszło nie tak...");
            }
        });
}



//UPDATE

function updateEvent(id, style, trainer, date) {
    const formData = new FormData();
    formData.append("updateEvent", true);
    formData.append("id", id);
    formData.append("styleId", style);
    formData.append("trainerId", trainer);
    formData.append("date", date);
    fetch("php/eventManager.php", {
        method: "post",
        body: formData
    })
        .then((response) => {
            return response.text();
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
        });
}

function updateTrainer(fname, lname, login, phone, desc, fb, insta, yt, twitter, photo, id) {
    // Console.log(photo);
    if (photo === undefined) {
        photoName = "";
    } else {
        photoName = photo.name;
    }
    const formData = new FormData();
    formData.append("updateTrainer", true);
    formData.append("fname", fname);
    formData.append("lname", lname);
    formData.append("login", login);
    formData.append("phone", phone);
    formData.append("desc", desc);
    formData.append("fb", fb);
    formData.append("insta", insta);
    formData.append("yt", yt);
    formData.append("twitter", twitter);
    formData.append("photo", photoName);
    formData.append("id", id);
    fetch("php/eventManager.php", {
        method: "post",
        body: formData
    })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            console.log(data);
            if (parseInt(data) === 1) {
                setTip("Zaktualizowałeś trenera!");
                getTrainers();
                closePopups();
            } else {
                setTip("Oj, coś poszło nie tak...");
                let response = document.createElement('div');
                response.classList.add('AjaxRes');
                response.innerHTML = data;
                document.body.appendChild(response);
            }
        });

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
    const formData = new FormData();
    formData.append("updateStyle", true);
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("id", id);
    fetch("php/eventManager.php", {
        method: "POST",
        body: formData
    })
        .then((response) => {
            return response.text();
        })
        .then((data) => {
            console.log(data);
            if (parseInt(data) === 1) {
                setTip("Zaktualizowałeś styl!");
                getStyles();
                closePopups();
            } else {
                setTip("Oj, coś poszło nie tak...");
            }
        });
}


// REMOVE

function deleteEvent(id) {
    const formData = new FormData();
    formData.append("deleteEvent", id);
    fetch("php/eventManager.php", {
        method: "POST",
        body: formData
    })
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            console.log(data);
            if (parseInt(data) === 1) {
                setTip("Usunąłeś wydarzenie!");
                closePopups();
                calendar.getEvents();
            } else {
                setTip("Oj, coś poszło nie tak...");
            }
        })
}

function deleteTrainer(id) {
    const formData = new FormData();
    formData.append("deleteTrainer", id);
    fetch("php/eventManager.php", {
        method: "POST",
        body: formData
    })
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            console.log(data);
            if (parseInt(data) === 1) {
                setTip("Usunąłeś trenera!");
                getTrainers();
                closePopups();
            } else {
                setTip("Oj, coś poszło nie tak...");
            }
        })
}

function deleteStyle(id) {
    const formData = new FormData();
    formData.append("deleteStyle", id);
    fetch("php/eventManager.php", {
        method: "POST",
        body: formData
    })
        .then((response) => {
            return response.text()
        })
        .then((data) => {
            console.log("POST");
            console.log(data);
            if (parseInt(data) === 1) {
                setTip("Usunąłeś styl!");
                getStyles();
                closePopups();
            } else {
                setTip("Oj, coś poszło nie tak...");
            }
        })
}




// ON SCROLL
window.onscroll = function () {
    scrollFunction();
};