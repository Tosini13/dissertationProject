class TimetableEvent extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.event.danceName;
        this.danceId = props.event.danceId;
        this.eventId = props.event.id;
        this.trainer = props.event.trainer;
        this.date = props.event.date;
        this.state = {
            name: props.event.danceName,
            danceId: props.event.danceId,
            eventId: props.event.id,
            trainer: props.event.trainer,
            date: props.event.date,
            user: user.ifTakePartIn(props.event.id)
        }
        this.popup = this.popup.bind(this);
    }

    popup() {
        let popup = document.getElementById("popup");
        popup.style.display = "block";
        popup.getElementsByClassName("danceName")[0].innerHTML = this.state.name;
        popup.getElementsByClassName("danceName")[0].setAttribute('href', '#' + this.state.danceId);
        popup.getElementsByClassName("trainer")[0].innerHTML = this.state.trainer;
        popup.getElementsByClassName("date")[0].innerHTML = this.state.date;
        if (this.state.user) {
            //SIGN OUT
            popup.getElementsByClassName("signUp")[0].innerHTML = "Zrezygnuj";
            popup.getElementsByClassName("signUp")[0].onclick = () => {
                let event = new Event();
                event.id = this.state.eventId;
                event.signOut(); //rights!
                this.setState({ user: user.ifTakePartIn(this.state.eventId) });
            }
        } else {
            //SIGN UP
            popup.getElementsByClassName("signUp")[0].innerHTML = "Zapisz się";
            popup.getElementsByClassName("signUp")[0].onclick = () => {
                let event = new Event();
                event.id = this.state.eventId;
                event.signUp(); //rights!
                this.setState({ user: user.ifTakePartIn(this.state.eventId) });
            }
        }
    }

    render() {
        let modifyClass = "";
        if (this.state.user) {
            modifyClass = "signedIn";
        }
        return (
            <a className={modifyClass} onClick={this.popup}>{this.state.name}</a>
        );
    };
}

class TimetableDay extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        this.days = this.props.day.map((event) =>
            <li>
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
        this.toggleEvent = this.toggleEvent.bind(this);
    }

    toggleEvent() {
        console.log(this);
    }

    render() {
        this.days = this.weekdays.map((nameDay, numDay) =>
            <li>
                <a className='btn listHeader' onClick={this.toggleEvent}>{nameDay}</a>
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