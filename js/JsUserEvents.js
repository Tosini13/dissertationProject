class ShowUserEvent extends React.Component {
    constructor(props) {
      super(props);
      this.remove = this.remove.bind(this);
    }
  
    remove() {
      popupQuestion("Czy na pewno chcesz usunąć?", ["Nie", () => {
        return 0;
      }], ["Tak", () => {
        deleteEvent(this.props.event.eventId);
        return this.props.event.eventId;
      }]);
    }
  
    render() {
      console.log(this.props.event);
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
      }))));
    }
  
  }
  
  class UserEvents extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      this.temp = this.props.events.map(event => /*#__PURE__*/React.createElement(ShowUserEvent, {
        event: event
      }));
      return this.temp;
    }
  
  }
  
  function userEventsReact(events) {
    ReactDOM.render( /*#__PURE__*/React.createElement(UserEvents, {
      events: events
    }), document.getElementById("userEventsPopup"));
  }