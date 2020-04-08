class ShowEvent extends React.Component {
    constructor(props) {
      super(props);
      this.remove = this.remove.bind(this);
      this.edit = this.edit.bind(this);
    }
  
    remove() {
      popupQuestion("Czy na pewno chcesz usunąć?", ["Nie", () => {
        return 0;
      }], ["Tak", () => {
        deleteEvent(this.props.event.eventId);
        return this.props.event.eventId;
      }]);
    }
  
    edit() {
      console.log("edit");
      let popup = document.getElementById("modifyEvent");
      popup.classList.add("activeStage");
      initEventEdition(this.props.event.eventId, this.props.trainer, this.props.style, this.props.event.date);
    }
  
    render() {
      return /*#__PURE__*/React.createElement("li", {
        key: this.props.event.id
      }, /*#__PURE__*/React.createElement("div", {
        className: "date"
      }, this.props.event.date.slice(0, 16)), /*#__PURE__*/React.createElement("div", null, this.props.event.dance), /*#__PURE__*/React.createElement("div", {
        className: "eventDashboard"
      }, /*#__PURE__*/React.createElement("a", {
        className: "delete",
        onClick: this.remove
      }, /*#__PURE__*/React.createElement("i", {
        className: "icon-cancel"
      })), /*#__PURE__*/React.createElement("a", {
        className: "edit",
        onClick: this.edit
      }, /*#__PURE__*/React.createElement("i", {
        className: "icon-pencil"
      }))));
    }
  
  }
  
  class EventsList extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      this.temp = this.props.events.map(event => /*#__PURE__*/React.createElement(ShowEvent, {
        event: event,
        trainer: this.props.trainer,
        style: this.props.style
      }));
      return this.temp;
    }
  
  }
  
  function modifyEvents(events, trainer, style) {
    ReactDOM.render( /*#__PURE__*/React.createElement(EventsList, {
      events: events,
      trainer: trainer,
      style: style
    }), document.getElementById("eventsToUpdate"));
  }