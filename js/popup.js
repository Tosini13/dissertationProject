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
    let photo = popup.querySelector('.photo');
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

    //PHOTO
    function checkPhoto() {
        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            // array.forEach(element => {

            // });
            setTip('Ta przegldarka nie wspomaga funkcji załączania plików');
            return 0;
        }

        if (!photo) {
            setTip("Ups... Plik nie znaleziony");
        }
        else if (!photo.files) {
            // alert("This browser doesn't seem to support the `files` property of file inputs.");
            setTip('Ta przegldarka nie wspomaga funkcji załączania plików');
        }
        else if (!photo.files[0]) {
            // alert("Please select a file before clicking 'Load'");
            setTip('Zdjęcie nie zostało załadowane');
        }
        else if ((photo.files[0].size / 1024) > 501) {
            setTip('Zdjęcie musi mieć rozmiar mniejszy niż 500KB');
        }
        else {
            return true;
        }
    }

    function checkPattern(input) {
        let pattern = input.getAttribute("pattern");
        console.log(input.getAttribute('required'));
        if (input.getAttribute('required') === undefined || input.getAttribute('required') === false || input.getAttribute('required') !== "") {
            console.log(input);
            console.log('!required');
            if (input.value == "") {
                return true;
            }
        }

        let inputPattern = new RegExp(pattern);
        if (inputPattern.exec(input.value)) {
            input.style.borderColor = 'transparent';
            return true;
        } else {
            input.style.borderColor = 'red';
            setTip(input.getAttribute("title"));
            return false;
        }
    }

    function temp() {
        if (checkPattern(login) && checkPattern(fb) && checkPattern(insta) && checkPattern(yt) && checkPattern(twitter) && checkPhoto()) {
            addTrainer(fname.value, lname.value, login.value, phone.value, desc.value, fb.value, insta.value, yt.value, twitter.value, photo.files[0]);
            clear();
        }
    }

    let submit = popup.querySelector(".addTrainer");
    submit.addEventListener("click", temp);
}

popupuCreateTrainer();

function popupuCreateStyle() {
    let popup = document.getElementById("createStyle");

    function temp() {
        let name = popup.querySelector(".name").value;
        let desc = popup.querySelector(".desc").value;
        console.log(name);
        console.log(desc);
        addStyle(name, desc);
    }

    let submit = popup.querySelector(".addStyle");
    submit.addEventListener("click", temp);
}

popupuCreateStyle();

