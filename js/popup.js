function popupuCreateEvent() {
    let popup = document.getElementById("createEvent");

    //TRAINERS
    let trainers = JSON.parse(window.localStorage.getItem("trainers"));
    for (let trainer of trainers) {
        let option = document.createElement("option");
        option.setAttribute("value", trainer.id);
        option.innerHTML = trainer.fname + " " + trainer.lname;
        popup.querySelector(".trainer").appendChild(option);
    }

    //STYLES
    let styles = JSON.parse(window.localStorage.getItem("styles"));
    for (let style of styles) {
        let option = document.createElement("option");
        option.setAttribute("value", style.id);
        option.innerHTML = style.name;
        popup.querySelector(".style").appendChild(option);
    }

    let today = new Date();
    let dateInput = popup.querySelector(".date");
    dateInput.setAttribute("value", today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + "12:00");

    function temp() {
        let trainerId = popup.querySelector(".trainer").value;
        let StyleId = popup.querySelector(".style").value;
        let dateFormat = dateInput.value.replace(/-/g, "").replace(/ /g, "").replace(/:/g, "") + "00";
        console.log(trainerId);
        console.log(StyleId);
        console.log(dateFormat);
        addEvent(StyleId, trainerId, dateFormat);
    }

    let submit = popup.querySelector(".addEvent");
    submit.addEventListener("click", temp);
}

popupuCreateEvent();


function popupuCreateTrainer() {
    let popup = document.getElementById("createTrainer");
    let fname = popup.querySelector('.fname');
    let lname = popup.querySelector('.lname');
    let login = popup.querySelector('.login');
    let phone = popup.querySelector('.phone');
    let fb = popup.querySelector('.fb');
    let insta = popup.querySelector('.insta');
    let yt = popup.querySelector('.yt');
    let twitter = popup.querySelector('.twitter');
    let desc = popup.querySelector('.desc');

    function clear() {
        //INIT
        let inputs = popup.getElementsByTagName('input');
        for (let input of inputs) {
            input.value = "";
        }
        popup.querySelector('textarea').value = "";
    }

    function checkPattern() {
        let pattern = login.getAttribute("pattern");
        console.log(pattern);
        let loginPattern = new RegExp(pattern);
        if (loginPattern.exec(login.value)) {
            login.style.borderColor = 'transparent';
            return true;
        } else {
            login.style.borderColor = 'red';
            setTip(login.getAttribute("title"));
            return false;
        }
    }

    function temp() {
        if (checkPattern()) {
            addTrainer(fname.value, lname.value, login.value, phone.value, desc.value, fb.value, insta.value, yt.value, twitter.value);
            clear();
        }
    }

    let submit = popup.querySelector(".addTrainer");
    submit.addEventListener("click", temp);
}

popupuCreateTrainer();
