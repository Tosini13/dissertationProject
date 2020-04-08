
class User {

    IfLoggedIn() {
        if (this.login) {
            return true;
        } else {
            return false;
        }
    }

    // LOGIN

    setLogin() {
        fetch("php/accountManager.php?ifLoggedIn")
            .then((response) => {
                return response.text();
            })
            .then((data) => {
                console.log(data);
                if (data) {
                    // sessionStorage.setItem('login', data);
                    this.login = data;
                    user.getUserEvents();
                    return true;
                } else {
                    // sessionStorage.removeItem('login');
                    this.login = null;
                    return false;
                }
            });
    }

    // setLogin();

    logout() {
        sessionStorage.removeItem('login');
        this.login = null;
    }


    ifTakePartIn(id) {
        for (let key in this.events) {
            if (parseInt(this.events[key]) == parseInt(id)) {
                return true;
            }
        }
        return false;
    }

    signOut(id) {
        console.log(this.events);
        for (let key in this.events) {
            if (parseInt(this.events[key]) == parseInt(id)) {
                this.events.splice(key, 1);
            }
        }
        console.log(this.events);
    }

    signIn(id) {
        console.log(this.events);
        this.events.push(id);
        console.log(this.events);
    }

    getUserEvents() {
        fetch("php/eventManager.php?getUserEvents")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let events = [];
                for (let item of data) {
                    events.push(item.id);
                }
                this.events = events;
            });
    }

    constructor() {
        this.login = null;
        this.events = [];
        this.setLogin();
        this.getUserEvents();
    }
}

var user = new User();