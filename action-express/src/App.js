import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      actions: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/api/action')
      .then(res =>
        this.setState({
          actions: res.data
        })
      )
      .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="App">
        {console.log(this.state.actions)}

        {this.state.actions.map(action => (
          <ul key={action.id}>
            <li />
            <li>{action.description}</li>
          </ul>
        ))}
      </div>
    );
  }
}

export default App;
