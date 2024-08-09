import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import Hello from './Hello';
import { createClient } from "@supabase/supabase-js";
import Feed from './Feed';

const supabase = createClient("https://rwxqvyrrvbgajbjnilsi.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3eHF2eXJydmJnYWpiam5pbHNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMyMDk0NDcsImV4cCI6MjAzODc4NTQ0N30.M9XRqSFMzJFXlPmJBdLJ21oYsE6i_oSpvMBod7DT1v0");

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      page: "enter name",
      username: "",
      supabase: supabase
      }
  }

  componentDidUpdate = ()=>{
    if (this.state.page === "enter name" && this.state.username.length> 0){this.setState({page: "feed"})}
  }

  importName = (name)=>{
    this.setState({username: name})
  }

    render(){
      if(this.state.page === "enter name"){
        return(
          <div className="App">
            <Hello callback={this.importName}/>
          </div>
        );
    }else{
      return(
        <div className='App'>
          <Feed {...this.state}/>
        </div>
      )
    }
  }
}

export default App;
