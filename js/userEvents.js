class ShowUserEvent extends React.Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
    }

    remove() {
        popupQuestion("Czy na pewno chcesz usunąć?", ["Nie", () => { return 0; }], ["Tak", () => { deleteEvent(this.props.event.eventId); return this.props.event.eventId; }]);
    }

    render() {
        console.log(this.props.event);
        return (
            <li key={this.props.event.id}>
                <div className='date'>
                    {this.props.event.date.slice(0, 16)}
                </div>
                <div>{this.props.event.dance}</div>
                <div className="eventDashboard">
                    <a className="delete" onClick={this.remove}><i className="icon-cancel"></i></a>
                </div>
            </li>
        );
    }
}


class UserEvents extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        this.temp = this.props.events.map((event) =>
            <ShowUserEvent event={event} />
        );
        return (
            this.temp
        );
    }
}


function userEventsReact(events) {
    ReactDOM.render(
        <UserEvents events={events} />,
        document.getElementById("userEventsPopup")
    );
}