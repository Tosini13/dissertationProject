class TimetableEvent extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.event.danceName;
        this.danceId = props.event.danceId;
        this.eventId = props.event.id;
        this.trainer = props.event.trainer;
        this.date = props.event.date;
        let participation = false;
        if (typeof user !== 'undefined') {
            console.log(user);
            participation = user.ifTakePartIn(props.event.id);
        }
        console.log(participation);
        this.state = {
            user: participation
        }
        this.popup = this.popup.bind(this);
    }

    popup() {
        let popup = document.getElementById("popup");
        popup.classList.add("bigPopupsOpen");
        popup.getElementsByClassName("danceName")[0].innerHTML = this.props.event.danceName;
        popup.getElementsByClassName("danceName")[0].setAttribute('href', '#' + this.props.event.danceId);
        for (let trainer of myStorage.trainers) {
            if (trainer.login.localeCompare(this.props.event.trainer) == 0) {
                popup.getElementsByClassName("trainer")[0].innerHTML = trainer.fname + " " + trainer.lname;
            }
        }
        popup.getElementsByClassName("date")[0].innerHTML = this.props.event.date.slice(0, 16);
        if (this.state.user) {
            //SIGN OUT
            popup.getElementsByClassName("signUp")[0].innerHTML = "Zrezygnuj";
            popup.getElementsByClassName("signUp")[0].onclick = () => {
                let event = new Event();
                event.id = this.props.event.id;
                event.signOut(); //rights!
                if (typeof user !== 'undefined') {
                    this.setState({ user: false });
                }
            }
        } else {
            //SIGN UP
            popup.getElementsByClassName("signUp")[0].innerHTML = "Zapisz się";
            popup.getElementsByClassName("signUp")[0].onclick = () => {
                let event = new Event();
                event.id = this.props.event.id;
                event.signUp(); //rights!
                if (typeof user !== 'undefined') {
                    this.setState({ user: true });
                }
            }
        }

    }

    render() {
        let modifyClass = "";
        if (this.state.user) {
            modifyClass = "signedIn";
        }
        return (
            <a className={modifyClass} onClick={this.popup}>
                {this.props.event.danceName}
                <div className='date'>
                    {this.props.event.date.slice(10, 16)}
                </div>
            </a>
        );
    };
}

class TimetableDay extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        this.days = this.props.day.map((event) =>
            <li key={event.id}>
                <TimetableEvent event={event} />
            </li>
        );
        return (
            <ul className='list'>
                {this.days}
            </ul>
        );
    }
}

class TimetableEvents extends React.Component {
    constructor(props) {
        super(props);
        this.weekdays = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
    }

    render() {
        this.days = this.weekdays.map((nameDay, numDay) =>
            <li key={numDay}>
                <a className='btn listHeader'>{nameDay}</a>
                <TimetableDay day={this.props.week[numDay]} />
            </li>
        );
        return (
            <ul>
                {this.days}
            </ul>
        );
    }
}

// ========================================

function createEvents(week) {
    ReactDOM.render(
        <TimetableEvents week={week} />,
        document.getElementById('timetableEvents')
    );
}