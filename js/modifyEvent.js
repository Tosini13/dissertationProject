class ShowEvent extends React.Component {
    constructor(props) {
        super(props);
        this.remove = this.remove.bind(this);
        this.edit = this.edit.bind(this);
    }

    remove() {
        popupQuestion("Czy na pewno chcesz usunąć?", ["Nie", () => { return 0 }], ["Tak", () => { deleteEvent(this.props.event.eventId); return this.props.event.eventId; }]);
    }

    edit() {
        console.log("edit");
        let popup = document.getElementById("modifyEvent");
        popup.classList.add("activeStage");
        initEventEdition(this.props.event.eventId, this.props.trainer, this.props.style, this.props.event.date);

    }

    render() {
        return (
            <li key={this.props.event.id}>
                <div className='date'>
                    {this.props.event.date.slice(0, 16)}
                </div>
                <div>{this.props.event.dance}</div>
                <div className="eventDashboard">
                    <a className="delete" onClick={this.remove}><i className="icon-cancel"></i></a>
                    <a className="edit" onClick={this.edit}><i className="icon-pencil"></i></a>
                </div>
            </li>
        );
    }
}


class EventsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        this.temp = this.props.events.map((event) =>
            <ShowEvent event={event} trainer={this.props.trainer} style={this.props.style} />
        );
        return (
            this.temp
        );
    }
}


function modifyEvents(events, trainer, style) {
    ReactDOM.render(
        <EventsList events={events} trainer={trainer} style={style} />,
        document.getElementById("eventsToUpdate")
    );
}