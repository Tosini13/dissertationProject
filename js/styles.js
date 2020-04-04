class StyleDesc extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let descClass = "list ";
        if (this.props.opened) {
            descClass += "descOpened";
        }
        return (
            <p className={descClass}>{this.props.desc}</p>
        );
    }
}

class StylesR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: 0
        }
    }

    openDesc(index) {
        this.setState({ opened: index });
    }

    render() {
        let styles = JSON.parse(window.localStorage.getItem("styles"));
        this.mainList = styles.map((item, index) => {
            if (index == this.state.opened) {
                return <div key={index}>
                    <a className="btn btnPress" onClick={() => { this.openDesc(index) }}>{item.name}</a>
                    < StyleDesc desc={item.description} opened={true} />
                </div>
            } else {
                return <div key={index}>
                    <a className="btn btnPress" onClick={() => { this.openDesc(index) }}>{item.name}</a>
                    < StyleDesc desc={item.description} opened={false} />
                </div>
            }
        });
        return (
            <div>
                {this.mainList}
            </div>
        );
    }
}


// ========================================

function fillStyles() {
    ReactDOM.render(
        <StylesR />,
        document.querySelector('#styles div')
    );
}