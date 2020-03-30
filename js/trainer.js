class TimetableEvent extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.event.danceName;
        this.danceId = props.event.danceId;
        this.eventId = props.event.id;
        this.trainer = props.event.trainer;
        this.date = props.event.date;
        this.state = {
            user: user.ifTakePartIn(props.event.id)
        }
        this.popup = this.popup.bind(this);
    }

    checkIfUpToDate() {
        validator = true;
        if (this.state != this.props.event) {

        }
    }

    popup() {
        let popup = document.getElementById("popup");
        popup.style.display = "block";
        popup.getElementsByClassName("danceName")[0].innerHTML = this.props.event.danceName;
        popup.getElementsByClassName("danceName")[0].setAttribute('href', '#' + this.props.event.danceId);
        popup.getElementsByClassName("trainer")[0].innerHTML = this.props.event.trainer;
        popup.getElementsByClassName("date")[0].innerHTML = this.props.event.date;
        if (this.state.user) {
            //SIGN OUT
            popup.getElementsByClassName("signUp")[0].innerHTML = "Zrezygnuj";
            popup.getElementsByClassName("signUp")[0].onclick = () => {
                let event = new Event();
                event.id = this.state.eventId;
                event.signOut(); //rights!
            }
        } else {
            //SIGN UP
            popup.getElementsByClassName("signUp")[0].innerHTML = "Zapisz się";
            popup.getElementsByClassName("signUp")[0].onclick = () => {
                let event = new Event();
                event.id = this.state.eventId;
                event.signUp(); //rights!
            }
        }

        this.setState({ user: user.ifTakePartIn(this.state.eventId) });
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
        console.log(this.props.week);
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

// ADMIN

class TimetableEventsAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.weekdays = ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"];
        this.toggleEvent = this.toggleEvent.bind(this);
        this.addEvent = this.addEvent.bind(this);
    }

    addEvent(numDay) {
        this.days = this.props.week.map((nameDay, nDay) => {
            if (numDay.numDay == nDay) {
                console.log(nameDay);
                let event = new Event();
                event.id = "9";
                event.trainer = "griez";
                event.danceId = "4";
                event.danceName = "Open Choreo"
                event.date = "2020-03-17 18:30:00";
                nameDay.push(event);
                console.log(nameDay);
            }
        });
        this.forceUpdate();
    }

    toggleEvent() {
        //console.log(this);
    }

    render() {
        //ADMIN
        let add = "";
        this.days = this.weekdays.map((nameDay, numDay) =>
            <li>
                <a className='btn listHeader' onClick={this.toggleEvent}>{nameDay}
                    <i className='icon-calendar-plus-o' onClick={() => this.addEvent({ numDay })}></i>
                </a>
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

function createTrainersSlider() {
    ReactDOM.render(
        <Trainer week={week} />,
        document.getElementById('timetableEvents')
    );
}