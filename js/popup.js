function popupuUpdateEvent() {
    let popup = document.getElementById("updateEvent");
    let trainerSelect = popup.querySelector(".trainer");
    let styleSelect = popup.querySelector(".style");
    let search = popup.querySelector(".search");
    let back = popup.querySelector(".back");
    let stages = popup.querySelectorAll(".stage");
    // let lists = popup.querySelectorAll(".mainList");
    //TRAINERS
    let trainers = JSON.parse(window.localStorage.getItem("trainers"));
    for (let trainer of trainers) {
        let option = document.createElement("option");
        option.setAttribute("value", trainer.id);
        option.innerHTML = trainer.fname + " " + trainer.lname;
        trainerSelect.appendChild(option);
    }

    //STYLES
    let styles = JSON.parse(window.localStorage.getItem("styles"));
    for (let style of styles) {
        let option = document.createElement("option");
        option.setAttribute("value", style.id);
        option.innerHTML = style.name;
        styleSelect.appendChild(option);
    }

    //EVENTS
    function getEvents() {
        let trainerId = popup.querySelector(".trainer").value;
        let styleId = popup.querySelector(".style").value;
        console.log(trainerId);
        console.log(styleId);
        fetch("php/eventManager.php?getEvents=" + true + "&trainer=" + trainerId + "&style=" + styleId)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                console.log(data);
                modifyEvents(data, trainerId, styleId);
            })
    }

    //BUTTONS
    function goBack() {
        stages[0].classList.add("activeStage");
        stages[1].classList.remove("activeStage");
    }

    back.addEventListener("click", goBack);

    function searchEvents() {
        stages[0].classList.remove("activeStage");
        stages[1].classList.add("activeStage");
        getEvents();
    }

    search.addEventListener("click", searchEvents);


    function temp() {
        let trainerId = trainerSelect.value;
        let StyleId = styleSelect.value;
        addEvent(StyleId, trainerId, dateFormat);
    }

    // let submit = popup.querySelector(".aEvent");
    // submit.addEventListener("click", temp);
}

function initEventEdition(id, trainer, style, date) {
    let popup = document.getElementById("modifyEvent");
    let trainerSelect = popup.querySelector(".trainer");
    let styleSelect = popup.querySelector(".style");
    let dateInput = popup.querySelector(".date");
    let btnUpdate = popup.querySelector(".updateEvent");

    //TRAINERS
    let trainers = JSON.parse(window.localStorage.getItem("trainers"));
    trainerSelect.innerHTML = "";
    console.log(trainers);
    for (let trainer of trainers) {
        let option = document.createElement("option");
        option.setAttribute("value", trainer.id);
        option.innerHTML = trainer.fname + " " + trainer.lname;
        trainerSelect.appendChild(option);
    }
    trainerSelect.value = trainer;

    //STYLES
    let styles = JSON.parse(window.localStorage.getItem("styles"));
    styleSelect.innerHTML = "";
    for (let style of styles) {
        let option = document.createElement("option");
        option.setAttribute("value", style.id);
        option.innerHTML = style.name;
        styleSelect.appendChild(option);
    }
    styleSelect.value = style;

    let today = new Date(date);
    dateInput.value = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes();


    function temp() {
        let trainerId = popup.querySelector(".trainer").value;
        let StyleId = popup.querySelector(".style").value;
        let dateFormat = dateInput.value.replace(/-/g, "").replace(/ /g, "").replace(/:/g, "") + "00";
        updateEvent(id, StyleId, trainerId, dateFormat);
    }

    btnUpdate.addEventListener("click", temp);

}

popupuUpdateEvent();



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
    dateInput.value = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + "12:00";
    // dateInput.setAttribute("value", today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + " " + "12:00");

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

//TRAINER

function popupuCreateTrainer() {
    let popup = document.getElementById("createTrainer");
    let close = popup.querySelector('.close');
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
        photo.parentElement.classList.remove("uploaded");
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
        else if (photo.files[0].type != "image/jpeg" && photo.files[0].type != "image/jpg" && photo.files[0].type != "image/png" && photo.files[0].type != "image/gif" && photo.files[0].type != "image/bmp") {
            console.log(photo.files[0].type);
            setTip('Plik ma nieodpowiednie rozszerzenie. Możliwe: jpeg, jpg, png, gif, bmp');
        }
        else {
            return true;
        }
    }

    fileInputManager(photo);

    function checkPattern(input) {
        let pattern = input.getAttribute("pattern");
        console.log(input.getAttribute('required'));
        if (input.getAttribute('required') === undefined || input.getAttribute('required') === false || input.getAttribute('required') !== "") {
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
    // close.addEventListener("click", clear);
}

popupuCreateTrainer();


function popupuUpdateTrainer() {
    let popup = document.getElementById("updateTrainer");
    let close = popup.querySelector('.close');
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

    let select = popup.querySelector(".trainer");
    //TRAINERS
    let trainers = JSON.parse(window.localStorage.getItem("trainers"));
    console.log(trainers);
    for (let trainer of trainers) {
        let option = document.createElement("option");
        option.setAttribute("value", trainer.id);
        option.innerHTML = trainer.fname + " " + trainer.lname;
        select.appendChild(option);
    }


    function changeTrainer() {
        for (let trainer of trainers) {
            if (trainer.id == select.value) {
                fname.value = trainer.fname;
                lname.value = trainer.lname;
                login.value = trainer.login;
                //phone.value = trainer.phone;
                photo.setAttribute("data-old", trainer.photo);
                fb.value = trainer.fb;
                insta.value = trainer.insta;
                fb.value = trainer.fb;
                yt.value = trainer.yt;
                twitter.value = trainer.twitter;
                desc.value = trainer.description;
            }
        }
    }

    select.addEventListener("change", changeTrainer);

    //PHOTO
    function checkPhoto() {

        if (!photo.files[0]) {
            // alert("Please select a file before clicking 'Load'");
            // setTip('Zdjęcie nie zostało załadowane');
            console.log(photo.files[0]);
            return true;
        }


        if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
            // array.forEach(element => {

            // });
            setTip('Ta przegldarka nie wspomaga funkcji załączania plików');
            return false;
        }

        if (!photo) {
            setTip("Ups... Plik nie znaleziony");
            return false;
        }

        if (!photo.files) {
            // alert("This browser doesn't seem to support the `files` property of file inputs.");
            setTip('Ta przegldarka nie wspomaga funkcji załączania plików');
            return false;
        }

        if (photo.files[0].type != "image/jpeg" && photo.files[0].type != "image/jpg" && photo.files[0].type != "image/png" && photo.files[0].type != "image/gif" && photo.files[0].type != "image/bmp") {
            setTip('Plik ma nieodpowiednie rozszerzenie. Możliwe: jpeg, jpg, png, gif, bmp');
        }

        if ((photo.files[0].size / 1024) > 501) {
            setTip('Zdjęcie musi mieć rozmiar mniejszy niż 500KB');
            return false;
        }

        return true;
    }

    fileInputManager(photo);

    function checkPattern(input) {
        let pattern = input.getAttribute("pattern");
        if (input.getAttribute('required') === undefined || input.getAttribute('required') === false || input.getAttribute('required') !== "") {
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

    function clear() {
        //INIT
        photo.value = "";
        photo.parentElement.classList.remove("uploaded");
    }

    function temp() {
        if (checkPattern(login) && checkPattern(fb) && checkPattern(insta) && checkPattern(yt) && checkPattern(twitter) && checkPhoto()) {
            console.log(photo.files[0]);
            updateTrainer(fname.value, lname.value, login.value, phone.value, desc.value, fb.value, insta.value, yt.value, twitter.value, photo.files[0], select.value);
            clear();
        }
    }

    let remove = popup.querySelector(".removeTrainer");
    remove.addEventListener("click", () => {
        deleteTrainer(select.value);
    });

    let submit = popup.querySelector(".updateTrainer");
    submit.addEventListener("click", temp);
    // close.addEventListener("click", clear);
    changeTrainer();
}

popupuUpdateTrainer();


//STYLE


function popupuCreateStyle() {
    let popup = document.getElementById("createStyle");

    function temp() {
        let name = popup.querySelector(".name").value;
        let desc = popup.querySelector(".desc").value;
        addStyle(name, desc);
    }

    let submit = popup.querySelector(".addStyle");
    submit.addEventListener("click", temp);
}

popupuCreateStyle();


function popupuUpdateStyle() {
    let popup = document.getElementById("updateStyle");
    let select = popup.querySelector(".style");
    let name = popup.querySelector(".name");
    let desc = popup.querySelector(".desc");

    //STYLES
    let styles = JSON.parse(window.localStorage.getItem("styles"));
    for (let style of styles) {
        let option = document.createElement("option");
        option.setAttribute("value", style.id);
        option.innerHTML = style.name;
        select.appendChild(option);
    }

    function changeStyle() {
        for (let style of styles) {
            if (style.id == select.value) {
                name.value = style.name;
                desc.value = style.description;
            }
        }
    }

    select.addEventListener("change", changeStyle);


    function temp() {
        let name = popup.querySelector(".name").value;
        let desc = popup.querySelector(".desc").value;
        console.log(select.value, name, desc);
        updateStyle(select.value, name, desc);
    }


    let remove = popup.querySelector(".removeStyle");
    remove.addEventListener("click", () => {
        deleteStyle(select.value);
    });

    let submit = popup.querySelector(".updateStyle");
    submit.addEventListener("click", temp);
    changeStyle();
}

popupuUpdateStyle();


// FILE INPUT LISTENER
function fileInputManager(fileInput) {

    function photoChenged() {
        this.parentElement.classList.add("uploaded");
        fileInput.addEventListener('click', (event) => {
            if (fileInput.value != "") {
                event.preventDefault();
                removePhotos();
            } else {
                return;
            }
        });
    }

    function removePhotos() {
        fileInput.value = "";
        fileInput.parentElement.classList.remove("uploaded");
    }

    fileInput.addEventListener('change', photoChenged);
}


//POPUP QUESTION
function popupQuestion(...datas) {
    //first is question, the next ones arrays with [0] - answers; [1] - method
    let popup = document.getElementById("popupQuestion");
    popup.querySelector(".listHeader").innerHTML = datas[0];
    popup.style.display = "block";
    function close() {
        popup.style.display = "none";
    }
    let answerList = popup.querySelector(".list");
    answerList.innerHTML = "";
    for (let i = 1; i < datas.length; i++) {
        let btn = document.createElement("li");
        btn.classList.add("btn");
        btn.innerHTML = datas[i][0];
        btn.onclick = () => {
            close();
            //function:
            console.log(datas[i][1]());

            // console.log(i - 1);
            // return (i - 1);
        }
        answerList.appendChild(btn);
    }
    return datas;
}