class StyleDesc extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      let descClass = "list ";
  
      if (this.props.opened) {
        descClass += "descOpened";
      }
  
      return /*#__PURE__*/React.createElement("p", {
        className: descClass
      }, this.props.desc);
    }
  
  }
  
  class StylesR extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        opened: 0
      };
    }
  
    openDesc(index) {
      this.setState({
        opened: index
      });
    }
  
    render() {
      let styles = this.props.styles;
      this.mainList = styles.map((item, index) => {
        if (index == this.state.opened) {
          return /*#__PURE__*/React.createElement("div", {
            key: index
          }, /*#__PURE__*/React.createElement("a", {
            className: "btn btnPress",
            onClick: () => {
              this.openDesc(index);
            }
          }, item.name), /*#__PURE__*/React.createElement(StyleDesc, {
            desc: item.description,
            opened: true
          }));
        } else {
          return /*#__PURE__*/React.createElement("div", {
            key: index
          }, /*#__PURE__*/React.createElement("a", {
            className: "btn btnPress",
            onClick: () => {
              this.openDesc(index);
            }
          }, item.name), /*#__PURE__*/React.createElement(StyleDesc, {
            desc: item.description,
            opened: false
          }));
        }
      });
      return /*#__PURE__*/React.createElement("div", null, this.mainList);
    }
  
  } // ========================================
  
  
  function fillStyles(styles) {
    ReactDOM.render( /*#__PURE__*/React.createElement(StylesR, {
      styles: styles
    }), document.querySelector('#styles div'));
  }