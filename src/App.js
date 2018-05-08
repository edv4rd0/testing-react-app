import React, { Component } from 'react';
import logo from './logo.svg';
import Login from './Login.js';
import SuccessMessage from './SuccessMessage.js';
import './App.css';

class App extends Component {
  state = { complete: false }
  
  handleSubmit = e => {
    e.preventDefault()
    this.setState({ complete: true })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <nav className='navbar' role='navigation'>
	    <ul>
	      <li className='nav-li'><a href='#'>Batman</a></li>
	      <li className='nav-li'><a href='#'>Superman</a></li>
	      <li className='nav-li'><a href='#'>Aquaman</a></li>
	      <li className='nav-li'><a href='#'>WOnder Woman</a></li>
	    </ul>
	  </nav>
	</header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
    
    { this.state.complete ? 
    <SuccessMessage/> 
     : 
     <Login submit={this.handleSubmit} />
    }
    </div>
    );
  }
}

export default App;
