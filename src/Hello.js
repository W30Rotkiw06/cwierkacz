import { Component } from "react";

class Hello extends Component{
    constructor(props){
        super(props);
        this.state = {name: ""}
    }

    handleName = event=>{
        this.setState({name: event.target.value})
    }

    handleClick = ()=>{
        this.props.callback(this.state.name);
    }

    render(){
        return(
            <div className="hello-screen">
                <h1 className="welcome">Welcome to <a className="link" href="https://translate.google.com/?sl=pl&tl=en&text=%C4%87wierka%C4%87&op=translate">ćwierkacz</a></h1>
                <p className="elon-dont-sue-me">Elon, pls dont sue me.<br/>Made by Wiktor Wieczorek</p>
                <input placeholder="Enter your name" className="name-input" type="text" value={this.state.name} onChange={this.handleName}></input>
                <br/>
                <button onClick={this.handleClick} disabled={this.state.name.length === 0? true: false} className="save-button">Continue</button>
                
            </div>
        )
    }
}
export default Hello